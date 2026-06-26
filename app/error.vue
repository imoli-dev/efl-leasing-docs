<script setup lang="ts">
import type { NuxtError } from '#app'
import {
  docSources,
  getDocSourceByPath,
  getDocSourceCollection,
  getLocalizedSourceTo,
  unwrapRootNavigation
} from '~/config/docs-sources'
import { mapNavigationPaths } from '~/utils/doc-navigation'

defineProps<{
  error: NuxtError
}>()

const route = useRoute()
const { locale } = useCurrentLocale()

useHead({
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const { data: files } = useLazyAsyncData(
  'search',
  async () => {
    const allDocs = await Promise.all(
      docSources.map(async (source) => {
        const collection = getDocSourceCollection(source, locale.value)
        const localizedPrefix = getLocalizedSourceTo(source, locale.value)
        const items = await queryCollectionSearchSections(collection)

        return items.map((file: { path?: string } & Record<string, unknown>) => {
          const filePath = file.path ?? ''
          const mappedPath = source.contentPathPrefix
            ? filePath.replace(source.contentPathPrefix, localizedPrefix)
            : filePath.startsWith(source.prefix)
              ? localizedPrefix + filePath.slice(source.prefix.length)
              : (filePath === '/' ? localizedPrefix : localizedPrefix + filePath)

          return {
            ...file,
            path: mappedPath
          }
        })
      })
    )

    return allDocs.flat()
  },
  { server: false, watch: [locale] }
)

const { data: navigation } = await useAsyncData(
  'navigation',
  async () => {
    const source = getDocSourceByPath(route.path) ?? docSources[0]
    if (!source) {
      return []
    }

    const collection = getDocSourceCollection(source, locale.value)
    const raw = await queryCollectionNavigation(collection)
    const localizedPrefix = getLocalizedSourceTo(source, locale.value)
    const mapped = mapNavigationPaths(raw, localizedPrefix, source.contentPathPrefix)
    return unwrapRootNavigation(mapped, localizedPrefix)
  },
  { watch: [locale, () => route.path] }
)

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <LangFallbackToast />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
