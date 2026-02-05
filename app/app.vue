<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { docSources, unwrapRootNavigation } from '~/config/docs-sources'

const { seo } = useAppConfig()
const route = useRoute()

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
        ? (contentPathPrefix
            ? itemPath.replace(contentPathPrefix, urlPrefix)
            : (itemPath === '/' ? urlPrefix : urlPrefix + itemPath))
        : itemPath,
      children: item.children
        ? mapNavigationPaths(item.children as ContentNavigationItem[], urlPrefix, contentPathPrefix)
        : item.children
    }
  })
}

const navCollections = docSources.map(s => s.collection)
const { data: navByCollection } = await useAsyncData(
  'nav-all',
  () => Promise.all(
    navCollections.map(async col => ({ col, nav: await queryCollectionNavigation(col) }))
  ).then(results => Object.fromEntries(results.map(({ col, nav }) => [col, nav])))
)

const navigation = computed<ContentNavigationItem[] | undefined>(() => {
  const path = route.path
  const source = docSources.find(s => path.startsWith(s.prefix))
  if (source) {
    const raw = navByCollection.value?.[source.collection]
    if (raw) {
      const mapped = mapNavigationPaths(raw, source.prefix, source.contentPathPrefix)
      return unwrapRootNavigation(mapped, source.prefix)
    }
    return raw
  }
  return navByCollection.value?.docs
})

function ensurePathOnNavItems(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.map(item => ({
    ...item,
    path: (item as { path?: string }).path ?? (item as { _path?: string })._path ?? '',
    children: item.children
      ? ensurePathOnNavItems(item.children as ContentNavigationItem[])
      : item.children
  }))
}

/** Combined navigation from all doc sources - used by search to show results from every documentation */
const searchNavigation = computed<ContentNavigationItem[]>(() => {
  const groups: ContentNavigationItem[] = []
  for (const s of docSources) {
    const raw = navByCollection.value?.[s.collection]
    if (!raw) continue
    const mapped = mapNavigationPaths(raw, s.prefix, s.contentPathPrefix)
    const unwrapped = unwrapRootNavigation(mapped, s.prefix)
    if (unwrapped?.length) {
      groups.push({
        title: s.label,
        _path: s.prefix,
        path: s.prefix,
        children: ensurePathOnNavItems(unwrapped as ContentNavigationItem[])
      })
    }
  }
  return groups
})

const { data: files } = useLazyAsyncData(
  'search',
  async () => {
    const allDocs = await Promise.all(
      docSources.map(async (s) => {
        const items = await queryCollectionSearchSections(s.collection)
        return items.map((file: { path?: string, id?: string } & Record<string, unknown>) => {
          const filePath = file.path ?? file.id ?? ''
          const mappedPath = s.contentPathPrefix
            ? filePath.replace(s.contentPathPrefix, s.prefix)
            : filePath.startsWith(s.prefix)
              ? filePath
              : (filePath === '/' ? s.prefix : s.prefix + filePath)
          return {
            ...file,
            path: mappedPath,
            id: mappedPath
          }
        })
      })
    )
    return allDocs.flat()
  },
  { server: false }
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="searchNavigation"
      />
    </ClientOnly>
  </UApp>
</template>
