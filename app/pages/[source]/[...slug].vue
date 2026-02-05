<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'
import { docSources, getDocSourceByPath, unwrapRootNavigation } from '~/config/docs-sources'

definePageMeta({
  layout: 'docs',
  validate: (route) => {
    const source = route.params.source
    const id = typeof source === 'string' ? source : source?.[0]
    return !!id && docSources.some(s => s.id === id)
  }
})

const route = useRoute()
const { toc } = useAppConfig()

const source = getDocSourceByPath(route.path)

if (!source || !source.prefix) {
  throw createError({ statusCode: 404, statusMessage: 'Documentation not found', fatal: true })
}

const sourceId = source.id

const contentPath = route.path

const { data: rawNavigation } = await useAsyncData(
  `doc-nav-${sourceId}`,
  () => queryCollectionNavigation(source.collection)
)

function mapNavigationPaths(
  items: ContentNavigationItem[] | undefined,
  urlPrefix: string,
  contentPathPrefix?: string
): ContentNavigationItem[] | undefined {
  if (!items) return items
  return items.map((item) => {
    const itemPath = (item as { _path?: string })._path
    return {
      ...item,
      _path: itemPath
        ? (contentPathPrefix ? itemPath.replace(contentPathPrefix, urlPrefix) : (itemPath === '/' ? urlPrefix : urlPrefix + itemPath))
        : itemPath,
      children: item.children
        ? mapNavigationPaths(item.children as ContentNavigationItem[], urlPrefix, contentPathPrefix)
        : item.children
    }
  })
}

const navigation = computed<ContentNavigationItem[] | undefined>(() => {
  const mapped = mapNavigationPaths(rawNavigation.value, source.prefix, source.contentPathPrefix)
  return unwrapRootNavigation(mapped, source.prefix)
})

provide<Ref<ContentNavigationItem[] | undefined>>('navigation', navigation as Ref<ContentNavigationItem[] | undefined>)

const { data: page } = await useAsyncData(
  `doc-page-${sourceId}-${contentPath}`,
  () => queryCollection(source.collection).path(contentPath).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`doc-surround-${sourceId}-${contentPath}`, () =>
  queryCollectionItemSurroundings(source.collection, contentPath, { fields: ['description'] })
)

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({ title, ogTitle: title, description, ogDescription: description })

const headline = computed(() => findPageHeadline(navigation?.value, route.path))

defineOgImageComponent('Docs', { headline: headline.value })

const links = computed(() => {
  const list: Array<{ icon: string, label: string, to: string, target: string }> = []
  if (source.editBaseUrl) {
    const p = page?.value?.path ?? ''
    const pathSuffix = p === '/' || p === source.prefix
      ? '/index'
      : (p.startsWith(source.prefix) ? p.slice(source.prefix.length) : p)
    list.push({
      icon: 'i-lucide-external-link',
      label: 'Edit this page',
      to: `${source.editBaseUrl}${pathSuffix}.md`,
      target: '_blank'
    })
  }
  return list
})

const frontmatterLinks = computed(() => (page.value as { links?: Array<Record<string, unknown>> })?.links ?? [])
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    >
      <template #links>
        <UButton
          v-for="(link, index) in frontmatterLinks"
          :key="index"
          v-bind="link"
        />
        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />
      <USeparator v-if="surround?.length" />
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body?.toc?.links"
      >
        <template #bottom>
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />
            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
