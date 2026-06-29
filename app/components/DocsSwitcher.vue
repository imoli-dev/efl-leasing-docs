<script setup lang="ts">
import { getLocalizedSourceTo } from '~/config/docs-sources'

withDefaults(defineProps<{ mode?: 'dropdown' | 'inline' }>(), {
  mode: 'dropdown'
})

const route = useRoute()
const { sources, getByPath } = useDocsSources()
const { locale } = useCurrentLocale()

const currentSource = computed(() => getByPath(route.path))
const currentLabel = computed(() => currentSource.value?.label ?? sources[0]?.label ?? 'Docs')

const dropdownItems = computed(() =>
  sources.map(s => ({
    label: s.label,
    to: getLocalizedSourceTo(s, locale.value),
    icon: s.icon,
    color: (currentSource.value?.id === s.id ? 'primary' : undefined) as 'primary' | undefined
  }))
)
</script>

<template>
  <div
    v-if="mode === 'inline'"
    class="flex flex-col gap-1"
  >
    <UButton
      v-for="source in sources"
      :key="source.id"
      :label="source.label"
      :to="getLocalizedSourceTo(source, locale)"
      :icon="source.icon"
      :variant="currentSource?.id === source.id ? 'soft' : 'ghost'"
      :color="currentSource?.id === source.id ? 'primary' : 'neutral'"
      size="sm"
      block
      class="justify-start"
    />
  </div>

  <div
    v-else
    class="flex items-center gap-2"
  >
    <UDropdownMenu
      v-slot="{ open }"
      :modal="false"
      :items="dropdownItems"
      :content="{ align: 'start' }"
      :ui="{ content: 'min-w-56' }"
      size="xs"
    >
      <UButton
        :label="currentLabel"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
        size="xs"
        class="-mb-[6px] font-semibold rounded-full truncate"
        :class="[open && 'bg-primary/15']"
        :ui="{
          trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
        }"
      />
    </UDropdownMenu>
  </div>
</template>
