<script setup lang="ts">
import { locales, type Locale } from '~/config/docs-sources'

withDefaults(defineProps<{ mode?: 'dropdown' | 'inline' }>(), {
  mode: 'dropdown'
})

const { locale: currentLocale } = useCurrentLocale()
const { switchLocale } = useLocaleSwitch()

const localeLabels: Record<string, string> = {
  en: 'English',
  pl: 'Polski'
}

function selectLocale(locale: Locale) {
  if (currentLocale.value !== locale) {
    switchLocale(locale)
  }
}

const dropdownItems = computed(() =>
  locales.map(locale => ({
    label: localeLabels[locale] ?? locale.toUpperCase(),
    color: (currentLocale.value === locale ? 'primary' : undefined) as 'primary' | undefined,
    onSelect: () => selectLocale(locale)
  }))
)
</script>

<template>
  <div
    v-if="mode === 'inline'"
    class="grid grid-cols-2 gap-1"
  >
    <UButton
      v-for="locale in locales"
      :key="locale"
      :label="localeLabels[locale] ?? locale.toUpperCase()"
      :variant="currentLocale === locale ? 'soft' : 'ghost'"
      :color="currentLocale === locale ? 'primary' : 'neutral'"
      :icon="currentLocale === locale ? 'i-lucide-check' : undefined"
      size="sm"
      block
      class="justify-center"
      @click="selectLocale(locale)"
    />
  </div>

  <UDropdownMenu
    v-else
    v-slot="{ open }"
    :modal="false"
    :items="dropdownItems"
    :content="{ align: 'end' }"
    :ui="{ content: 'min-w-36' }"
    size="xs"
  >
    <UButton
      :label="localeLabels[currentLocale] ?? currentLocale.toUpperCase()"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="rounded-full"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
    />
  </UDropdownMenu>
</template>
