<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter>
    <template #left>
      <span>{{ footer.credits }}</span>
      <span class="mx-1">•</span>
      <span class="text-sm text-muted">
        Created by
        <NuxtLink
          :to="footer.author?.url || 'https://imoli.dev'"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium hover:underline"
        >
          {{ footer.author?.name || 'Imoli' }}
        </NuxtLink>
      </span>
    </template>

    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
