<script setup lang="ts">
import { locales } from '~/config/docs-sources'

const { locale: currentLocale } = useCurrentLocale()
const { switchLocale } = useLocaleSwitch()

const localeLabels: Record<string, string> = {
  en: 'English',
  pl: 'Polski'
}

const dropdownItems = computed(() =>
  locales.map(locale => ({
    label: localeLabels[locale] ?? locale.toUpperCase(),
    color: (currentLocale.value === locale ? 'primary' : undefined) as 'primary' | undefined,
    onSelect: () => {
      if (currentLocale.value !== locale) {
        switchLocale(locale)
      }
    }
  }))
)
</script>

<template>
  <UDropdownMenu
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
