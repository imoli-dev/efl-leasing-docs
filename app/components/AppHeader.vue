<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { header } = useAppConfig()
const { locale } = useCurrentLocale()

const docsSectionLabels: Record<string, string> = {
  en: 'Documentation',
  pl: 'Dokumentacja'
}

const docsSectionLabel = computed(() => docsSectionLabels[locale.value] ?? docsSectionLabels.en)

const headerHome = computed(() => {
  const to = header?.to || '/'
  if (to === '/') {
    return `/${locale.value}`
  }

  if (to.startsWith('/') && !to.startsWith(`/${locale.value}`)) {
    return `/${locale.value}${to}`
  }

  return to
})
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="headerHome"
  >
    <UContentSearchButton
      v-if="header?.search"
      :collapsed="false"
      class="w-full"
    />

    <template
      v-if="header?.logo?.dark || header?.logo?.light || header?.title"
      #title
    >
      <UColorModeImage
        v-if="header?.logo?.dark || header?.logo?.light"
        :light="header?.logo?.light!"
        :dark="header?.logo?.dark!"
        :alt="header?.logo?.alt"
        class="h-6 w-auto shrink-0"
      />

      <span v-else-if="header?.title">
        {{ header.title }}
      </span>
    </template>

    <template
      v-else
      #left
    >
      <div class="flex items-center gap-4">
        <NuxtLink :to="headerHome">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
        <DocsSwitcher class="hidden lg:flex" />
      </div>
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
      />

      <div class="hidden lg:block">
        <LocaleSwitcher />
      </div>

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <div class="flex flex-col gap-4">
        <div class="space-y-1.5 lg:hidden">
          <p class="px-1 text-xs font-semibold text-muted">
            {{ docsSectionLabel }}
          </p>
          <DocsSwitcher mode="inline" />
        </div>

        <div class="lg:hidden">
          <LocaleSwitcher block />
        </div>

        <USeparator class="lg:hidden" />

        <UContentNavigation
          highlight
          :navigation="navigation"
        />
      </div>
    </template>
  </UHeader>
</template>
