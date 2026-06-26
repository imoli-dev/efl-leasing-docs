import {
  docSources,
  prefixedDocSources,
  getDocSourceById,
  getDocSourceByPath,
  getDocSourceByPrefix,
  getLocalizedSourceTo,
  getLocalizedIndexPath,
  getDocSourceCollection
} from '~/config/docs-sources'

export function useDocsSources() {
  const { locale } = useCurrentLocale()

  return {
    sources: docSources,
    prefixedSources: prefixedDocSources,
    locale,
    getById: getDocSourceById,
    getByPath: getDocSourceByPath,
    getByPrefix: getDocSourceByPrefix,
    getLocalizedTo: (source: Parameters<typeof getLocalizedSourceTo>[0]) => getLocalizedSourceTo(source, locale.value),
    getLocalizedIndex: (source: Parameters<typeof getLocalizedIndexPath>[0]) => getLocalizedIndexPath(source, locale.value),
    getCollection: (source: Parameters<typeof getDocSourceCollection>[0]) => getDocSourceCollection(source, locale.value)
  }
}
