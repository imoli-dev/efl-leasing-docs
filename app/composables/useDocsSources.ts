import {
  docSources,
  prefixedDocSources,
  getDocSourceById,
  getDocSourceByPath,
  getDocSourceByPrefix
} from '~/config/docs-sources'

export function useDocsSources() {
  return {
    sources: docSources,
    prefixedSources: prefixedDocSources,
    getById: getDocSourceById,
    getByPath: getDocSourceByPath,
    getByPrefix: getDocSourceByPrefix
  }
}
