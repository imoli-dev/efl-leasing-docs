<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const toast = useToast()
const { locale } = useCurrentLocale()

const fallbackMessages: Record<string, string> = {
  en: 'This page is not available in the selected language. Redirected to the documentation section.',
  pl: 'Ta strona nie jest dostępna w wybranym języku. Przekierowano do sekcji dokumentacji.'
}

watch(
  () => route.query.lang_fallback,
  (value) => {
    if (value !== '1') {
      return
    }

    toast.add({
      title: fallbackMessages[locale.value] ?? fallbackMessages.en,
      color: 'warning',
      icon: 'i-lucide-languages'
    })

    const query = { ...route.query }
    delete query.lang_fallback
    router.replace({ path: route.path, query })
  },
  { immediate: true }
)
</script>

<template>
  <span class="hidden" />
</template>
