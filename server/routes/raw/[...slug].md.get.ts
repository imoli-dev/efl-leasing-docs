import { withLeadingSlash } from 'ufo'
import { stringify } from 'minimark/stringify'
import { queryCollection, queryCollectionNavigation } from '@nuxt/content/server'
import type { Collections } from '@nuxt/content'
import {
  defaultLocale,
  getDocSourceByLogicalPath,
  getDocSourceCollection,
  stripLocaleFromPath
} from '../../../app/config/docs-sources'

export default eventHandler(async (event) => {
  const slug = getRouterParams(event)['slug.md']
  if (!slug?.endsWith('.md')) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  const path = withLeadingSlash(slug.replace('.md', ''))
  const { locale, logicalPath } = stripLocaleFromPath(path)
  const resolvedLocale = locale ?? defaultLocale
  const source = getDocSourceByLogicalPath(logicalPath)
  const collection = (source
    ? getDocSourceCollection(source, resolvedLocale)
    : `docs_${resolvedLocale}`) as keyof Collections

  let page = await queryCollection(event, collection).path(logicalPath).first()

  // Some sources have no dedicated index document for their root (e.g. /docs or
  // /wordpress-plugin only expose child pages). The rendered page falls back to
  // the first navigation/collection item in loadDocIndexPage, so mirror that here
  // to keep the raw markdown endpoint in sync with what the user actually sees.
  if (!page && source && logicalPath === source.prefix) {
    const navigation = await queryCollectionNavigation(event, collection)
    const firstPath = (navigation?.[0] as { path?: string } | undefined)?.path
    if (firstPath) {
      page = await queryCollection(event, collection).path(firstPath).first()
    }

    if (!page) {
      const items = await queryCollection(event, collection).all()
      page = items[0] ?? null
    }
  }

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  if (page.body.value[0]?.[0] !== 'h1') {
    page.body.value.unshift(['blockquote', {}, page.description])
    page.body.value.unshift(['h1', {}, page.title])
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  return stringify({ ...page.body, type: 'minimark' }, { format: 'markdown/html' })
})
