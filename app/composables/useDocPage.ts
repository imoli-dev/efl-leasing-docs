import type { Collections } from '@nuxt/content'
import {
  docSources,
  getDocSourceById,
  getDocSourceCollection,
  getEditBaseUrl,
  getLocalizedSourceTo,
  isLocale,
  stripLocaleFromPath,
  unwrapRootNavigation,
  type DocCollection,
  type DocSource,
  type Locale
} from '~/config/docs-sources'
import { mapNavigationPaths } from '~/utils/doc-navigation'
import { getDocFallbackPath } from '~/utils/locale-switch'

async function queryDocPage(collection: DocCollection, contentPath: string) {
  return queryCollection(collection as keyof Collections).path(contentPath).first()
}

type DocPageItem = NonNullable<Awaited<ReturnType<typeof queryDocPage>>>

export function useDocPageContext(sourceId: string, locale: Locale) {
  const route = useRoute()
  const { toc } = useAppConfig()

  const source = getDocSourceById(sourceId)

  if (!source) {
    throw createError({ statusCode: 404, statusMessage: 'Documentation not found', fatal: true })
  }

  const collection = getDocSourceCollection(source, locale)
  const { logicalPath } = stripLocaleFromPath(route.path)
  const localizedPrefix = getLocalizedSourceTo(source, locale)
  const contentPath = logicalPath

  const { data: rawNavigation } = useAsyncData(
    `doc-nav-${locale}-${sourceId}`,
    () => queryCollectionNavigation(collection)
  )

  const navigation = computed(() => {
    const mapped = mapNavigationPaths(rawNavigation.value, localizedPrefix, source.contentPathPrefix)
    return unwrapRootNavigation(mapped, localizedPrefix)
  })

  provide('navigation', navigation)

  return {
    source,
    collection,
    locale,
    logicalPath,
    contentPath,
    localizedPrefix,
    rawNavigation,
    navigation,
    toc
  }
}

export async function loadDocPage(
  source: DocSource,
  collection: DocCollection,
  contentPath: string,
  locale: Locale
): Promise<DocPageItem> {
  const page = await queryDocPage(collection, contentPath)

  if (!page) {
    const fallbackPath = getDocFallbackPath(locale, contentPath)
    await navigateTo({
      path: fallbackPath,
      query: { lang_fallback: '1' }
    })
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  return page
}

export async function loadDocIndexPage(
  source: DocSource,
  collection: DocCollection,
  contentPath: string,
  locale: Locale,
  rawNavigation: Ref<unknown[] | undefined>
): Promise<DocPageItem> {
  let page = await queryDocPage(collection, contentPath)

  if (!page && rawNavigation.value?.length) {
    const firstPath = (rawNavigation.value[0] as { _path?: string })?._path
    if (firstPath) {
      page = await queryDocPage(collection, firstPath)
    }
  }

  if (!page) {
    const items = await queryCollection(collection as keyof Collections).all()
    page = items[0] ?? null
  }

  if (!page) {
    const fallbackPath = getDocFallbackPath(locale, contentPath)
    await navigateTo({
      path: fallbackPath,
      query: { lang_fallback: '1' }
    })
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  return page
}

export function buildEditPageLink(
  source: DocSource,
  locale: Locale,
  pagePath: string
) {
  const editBaseUrl = getEditBaseUrl(source, locale)
  if (!editBaseUrl) {
    return null
  }

  const { logicalPath } = stripLocaleFromPath(pagePath)
  const pathSuffix = logicalPath === '/' || logicalPath === source.prefix
    ? '/index'
    : (logicalPath.startsWith(source.prefix) ? logicalPath.slice(source.prefix.length) : logicalPath)

  return {
    icon: 'i-lucide-external-link',
    label: 'Edit this page',
    to: `${editBaseUrl}${pathSuffix}.md`,
    target: '_blank'
  }
}

function getRouteParam(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value[0]
  }

  return undefined
}

export function validateDocRoute(route: { params: Record<string, unknown> }) {
  const localeId = getRouteParam(route.params.locale)
  const sourceId = getRouteParam(route.params.source)

  return !!localeId
    && isLocale(localeId)
    && !!sourceId
    && docSources.some(s => s.id === sourceId)
}
