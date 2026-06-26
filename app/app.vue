<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import {
  docSources,
  getCollectionsForLocale,
  getDocSourceByPath,
  getDocSourceCollection,
  getLocalizedSourceTo,
  unwrapRootNavigation
} from '~/config/docs-sources'
import { ensurePathOnNavItems, mapNavigationPaths } from '~/utils/doc-navigation'

const { seo } = useAppConfig()
const route = useRoute()
const { locale } = useCurrentLocale()

const { data: navByCollection } = await useAsyncData(
  'nav-all',
  async () => {
    const collections = getCollectionsForLocale(locale.value)
    const results = await Promise.all(
      collections.map(async col => ({ col, nav: await queryCollectionNavigation(col) }))
    )
    return Object.fromEntries(results.map(({ col, nav }) => [col, nav]))
  },
  { watch: [locale] }
)

const navigation = computed<ContentNavigationItem[] | undefined>(() => {
  const source = getDocSourceByPath(route.path)
  if (source) {
    const collection = getDocSourceCollection(source, locale.value)
    const raw = navByCollection.value?.[collection]
    if (raw) {
      const localizedPrefix = getLocalizedSourceTo(source, locale.value)
      const mapped = mapNavigationPaths(raw, localizedPrefix, source.contentPathPrefix)
      return unwrapRootNavigation(mapped, localizedPrefix)
    }
    return raw
  }

  const docsSource = docSources[0]
  if (!docsSource) {
    return undefined
  }

  const raw = navByCollection.value?.[getDocSourceCollection(docsSource, locale.value)]
  if (!raw) {
    return raw
  }

  const localizedPrefix = getLocalizedSourceTo(docsSource, locale.value)
  const mapped = mapNavigationPaths(raw, localizedPrefix, docsSource.contentPathPrefix)
  return unwrapRootNavigation(mapped, localizedPrefix)
})

const searchNavigation = computed<ContentNavigationItem[]>(() => {
  const groups: ContentNavigationItem[] = []

  for (const source of docSources) {
    const collection = getDocSourceCollection(source, locale.value)
    const raw = navByCollection.value?.[collection]
    if (!raw) continue

    const localizedPrefix = getLocalizedSourceTo(source, locale.value)
    const mapped = mapNavigationPaths(raw, localizedPrefix, source.contentPathPrefix)
    const unwrapped = unwrapRootNavigation(mapped, localizedPrefix)

    if (unwrapped?.length) {
      groups.push({
        title: source.label,
        _path: localizedPrefix,
        path: localizedPrefix,
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
      docSources.map(async (source) => {
        const collection = getDocSourceCollection(source, locale.value)
        const localizedPrefix = getLocalizedSourceTo(source, locale.value)
        const items = await queryCollectionSearchSections(collection)

        return items.map((file: { path?: string, id?: string } & Record<string, unknown>) => {
          const filePath = file.path ?? file.id ?? ''
          const mappedPath = source.contentPathPrefix
            ? filePath.replace(source.contentPathPrefix, localizedPrefix)
            : filePath.startsWith(source.prefix)
              ? localizedPrefix + filePath.slice(source.prefix.length)
              : (filePath === '/' ? localizedPrefix : localizedPrefix + filePath)

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
  { server: false, watch: [locale] }
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale
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

    <LangFallbackToast />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="searchNavigation"
      />
    </ClientOnly>
  </UApp>
</template>
