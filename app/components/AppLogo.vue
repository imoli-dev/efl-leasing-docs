<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <img
    src="/logo.svg"
    alt="EFL"
    loading="eager"
    fetchpriority="high"
    v-bind="$attrs"
  >
</template>
