import {
  defaultLocale,
  getLocaleFromPath,
  type Locale
} from '~/config/docs-sources'

export function useCurrentLocale() {
  const route = useRoute()

  const locale = computed<Locale>(() => getLocaleFromPath(route.path) ?? defaultLocale)

  return {
    locale
  }
}
