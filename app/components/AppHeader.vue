<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { header } = useAppConfig()
const { locale } = useCurrentLocale()

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
        <DocsSwitcher />
      </div>
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
      />

      <LocaleSwitcher />

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
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
