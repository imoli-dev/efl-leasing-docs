<script setup lang="ts">
import { locales, type Locale } from '~/config/docs-sources'

withDefaults(defineProps<{ block?: boolean }>(), {
  block: false
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
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="dropdownItems"
    :content="{ align: block ? 'start' : 'end' }"
    :ui="{ content: 'min-w-36' }"
    size="xs"
  >
    <UButton
      :label="localeLabels[currentLocale] ?? currentLocale.toUpperCase()"
      icon="i-lucide-languages"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      :block="block"
      class="rounded-full"
      :class="[open && 'bg-primary/15', block && 'justify-between']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
    />
  </UDropdownMenu>
</template>
