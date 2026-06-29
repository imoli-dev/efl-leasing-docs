<script setup lang="ts">
import type { DocSource } from '~/config/docs-sources'
import {
  buildContentLocaleMismatchMessage,
  getSourceContentLocale,
  isContentLocaleMismatch
} from '~/utils/doc-locale'

const props = defineProps<{
  source: DocSource
}>()

const { locale: uiLocale } = useCurrentLocale()

const show = computed(() => isContentLocaleMismatch(props.source, uiLocale.value))

const message = computed(() =>
  buildContentLocaleMismatchMessage(
    uiLocale.value,
    getSourceContentLocale(props.source, uiLocale.value)
  )
)
</script>

<template>
  <UAlert
    v-if="show"
    icon="i-lucide-languages"
    color="warning"
    variant="subtle"
    :title="message"
    class="mb-6"
  />
</template>
