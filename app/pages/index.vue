<script setup lang="ts">
import { defaultLocale } from '~/config/docs-sources'

await navigateTo(`/${defaultLocale}`, { redirectCode: 302 })
</script>
