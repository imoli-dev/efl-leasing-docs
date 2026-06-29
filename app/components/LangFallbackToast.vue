<script setup lang="ts">
import type { LocaleSwitchReason } from '~/utils/locale-switch'
import { getLocaleNameInUiLanguage } from '~/utils/doc-locale'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { locale } = useCurrentLocale()

function buildFallbackMessage(
  uiLocale: typeof locale.value,
  reason: LocaleSwitchReason
): string {
  const uiName = getLocaleNameInUiLanguage(uiLocale, uiLocale)

  if (uiLocale === 'pl') {
    switch (reason) {
      case 'missing_translation':
        return `Ta strona nie jest dostępna w języku ${uiName}. Przekierowano do innej strony w tej sekcji dokumentacji.`
      case 'no_source_index':
        return `Ta sekcja dokumentacji nie jest dostępna w języku ${uiName}. Przekierowano do przeglądu dokumentacji.`
      case 'no_landing':
        return `Strona główna nie jest dostępna w języku ${uiName}. Przekierowano do przeglądu dokumentacji.`
    }
  }

  switch (reason) {
    case 'missing_translation':
      return `This page is not available in ${uiName}. You have been redirected to another page in this documentation section.`
    case 'no_source_index':
      return `This documentation section is not available in ${uiName}. You have been redirected to the documentation overview.`
    case 'no_landing':
      return `The landing page is not available in ${uiName}. You have been redirected to the documentation overview.`
  }
}

watch(
  () => route.query.lang_fallback,
  (value) => {
    if (value !== '1') {
      return
    }

    const reasonParam = route.query.lang_fallback_reason
    const reason = (typeof reasonParam === 'string' ? reasonParam : 'missing_translation') as LocaleSwitchReason

    toast.add({
      title: buildFallbackMessage(locale.value, reason),
      color: 'warning',
      icon: 'i-lucide-languages'
    })

    const query = { ...route.query }
    delete query.lang_fallback
    delete query.lang_fallback_reason
    router.replace({ path: route.path, query })
  },
  { immediate: true }
)
</script>

<template>
  <span class="hidden" />
</template>
