import type { Collections } from '@nuxt/content'
import type { DocCollection, Locale } from '~/config/docs-sources'
import { resolveLocaleSwitchWithChecker } from '~/utils/locale-switch'

export function useLocaleSwitch() {
  const route = useRoute()

  async function pageExists(collection: DocCollection | `landing_${Locale}`, logicalPath: string): Promise<boolean> {
    const page = await queryCollection(collection as keyof Collections).path(logicalPath).first()
    return !!page
  }

  async function resolveLocaleSwitch(targetLocale: Locale, currentPath = route.path) {
    return resolveLocaleSwitchWithChecker(targetLocale, currentPath, pageExists)
  }

  async function switchLocale(targetLocale: Locale) {
    const result = await resolveLocaleSwitch(targetLocale)

    if (result.fallback) {
      return navigateTo({
        path: result.to,
        query: {
          lang_fallback: '1',
          lang_fallback_reason: result.reason ?? 'missing_translation'
        }
      })
    }

    return navigateTo(result.to)
  }

  return {
    resolveLocaleSwitch,
    switchLocale
  }
}
