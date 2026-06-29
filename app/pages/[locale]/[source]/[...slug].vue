<script setup lang="ts">
import { findPageHeadline } from '@nuxt/content/utils'
import {
  buildEditPageLink,
  loadDocPage,
  useDocPageContext
} from '~/composables/useDocPage'
import { isLocale } from '~/config/docs-sources'

definePageMeta({
  layout: 'docs',
  middleware: 'locale'
})

const route = useRoute()
const localeParam = route.params.locale
const sourceParam = route.params.source
const locale = (typeof localeParam === 'string' ? localeParam : localeParam?.[0])!
const sourceId = (typeof sourceParam === 'string' ? sourceParam : sourceParam?.[0])!

if (!isLocale(locale)) {
  throw createError({ statusCode: 404, statusMessage: 'Locale not found', fatal: true })
}

const {
  source,
  collection,
  contentPath,
  navigation,
  toc
} = useDocPageContext(sourceId, locale)

const page = await loadDocPage(source, collection, contentPath, locale)

const { data: surround } = await useAsyncData(
  `doc-surround-${locale}-${sourceId}-${contentPath}`,
  () => queryCollectionItemSurroundings(collection, contentPath, { fields: ['description'] })
)

const title = page.seo?.title || page.title
const description = page.seo?.description || page.description

useSeoMeta({ title, ogTitle: title, description, ogDescription: description })

const headline = computed(() => findPageHeadline(navigation?.value, route.path))

defineOgImageComponent('Docs', { headline: headline.value })

const links = computed(() => {
  const editLink = buildEditPageLink(source, locale, page.path ?? route.path)
  return editLink ? [editLink] : []
})

const frontmatterLinks = computed(() => (page as { links?: Array<Record<string, unknown>> })?.links ?? [])
</script>

<template>
  <UPage>
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
      <ContentRenderer :value="page" />
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
