<script setup lang="ts">
import type { NuxtError } from '#app'

import { docSources } from '~/config/docs-sources'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'en'
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
      docSources.map(async (s) => {
        const items = await queryCollectionSearchSections(s.collection)
        return items.map((file: { path?: string } & Record<string, unknown>) => {
          const filePath = file.path ?? ''
          const mappedPath = s.contentPathPrefix
            ? filePath.replace(s.contentPathPrefix, s.prefix)
            : filePath.startsWith(s.prefix)
              ? filePath
              : (filePath === '/' ? s.prefix : s.prefix + filePath)
          return {
            ...file,
            path: mappedPath
          }
        })
      })
    )
    return allDocs.flat()
  },
  { server: false }
)

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
