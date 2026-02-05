<script setup lang="ts">
const route = useRoute()
const { sources, getByPath } = useDocsSources()

const currentSource = computed(() => getByPath(route.path))
const currentLabel = computed(() => currentSource.value?.label ?? sources[0]?.label ?? 'Docs')

const dropdownItems = computed(() =>
  sources.map(s => ({
    label: s.label,
    to: s.to,
    icon: s.icon,
    color: (currentSource.value?.id === s.id ? 'primary' : undefined) as 'primary' | undefined
  }))
)
</script>

<template>
  <div class="flex items-center gap-2">
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
