<script setup lang="ts">
import { getLandingCollection, isLocale } from '~/config/docs-sources'

definePageMeta({
  middleware: 'locale'
})

const route = useRoute()
const localeParam = computed(() => {
  const value = route.params.locale
  return typeof value === 'string' ? value : value?.[0]
})

if (!localeParam.value || !isLocale(localeParam.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const locale = localeParam.value
const collection = getLandingCollection(locale)

const { data: page } = await useAsyncData(
  `landing-${locale}`,
  () => queryCollection(collection).path('/').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
  />
</template>
