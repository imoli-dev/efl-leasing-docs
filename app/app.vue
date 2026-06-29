<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import {
  docSources,
  getDocSourceByPath,
  getDocSourceCollection,
  getLocalizedSourceTo,
  unwrapRootNavigation
} from '~/config/docs-sources'
import { ensurePathOnNavItems, mapNavigationPaths } from '~/utils/doc-navigation'

const { seo } = useAppConfig()
const route = useRoute()
const { locale } = useCurrentLocale()

// Key navigation by source id (locale-independent) rather than by collection
// name. The collection name changes per locale (e.g. sdk_docs_en vs
// sdk_docs_pl), so a collection-keyed map would miss after a client-side locale
// switch and the sidebar would vanish until/unless the data refetched.
const { data: navBySource } = await useAsyncData(
  'nav-all',
  async () => {
    const results = await Promise.all(
      docSources.map(async source => ({
        id: source.id,
        nav: await queryCollectionNavigation(getDocSourceCollection(source, locale.value))
      }))
    )
    return Object.fromEntries(results.map(({ id, nav }) => [id, nav]))
  },
  {
    watch: [locale],
    // Only use the payload cache during hydration. Otherwise the default
    // getCachedData would return the stale payload on a locale switch and the
    // handler would never re-query, leaving the sidebar in the previous locale.
    getCachedData: (key, nuxtApp) => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : undefined
  }
)

const navigation = computed<ContentNavigationItem[] | undefined>(() => {
  const source = getDocSourceByPath(route.path) ?? docSources[0]
  if (!source) {
    return undefined
  }

  const raw = navBySource.value?.[source.id]
  if (!raw) {
    return raw as ContentNavigationItem[] | undefined
  }

  const localizedPrefix = getLocalizedSourceTo(source, locale.value)
  const mapped = mapNavigationPaths(raw, localizedPrefix, source.prefix)
  return unwrapRootNavigation(mapped, localizedPrefix, source.prefix)
})

const searchNavigation = computed<ContentNavigationItem[]>(() => {
  const groups: ContentNavigationItem[] = []

  for (const source of docSources) {
    const raw = navBySource.value?.[source.id]
    if (!raw) continue

    const localizedPrefix = getLocalizedSourceTo(source, locale.value)
    const mapped = mapNavigationPaths(raw, localizedPrefix, source.prefix)
    const unwrapped = unwrapRootNavigation(mapped, localizedPrefix, source.prefix)

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
