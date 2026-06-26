/** Names of the page-type content collections defined in content.config.ts. */
export type DocCollection = 'docs_en' | 'docs_pl' | 'sdk_docs_en' | 'sdk_docs_pl' | 'wordpress_docs_en' | 'wordpress_docs_pl'

export type Locale = 'en' | 'pl'

export const locales: Locale[] = ['en', 'pl']
export const defaultLocale: Locale = 'en'

export interface DocSource {
  id: string
  label: string
  /** Logical path without locale, e.g. /sdk */
  prefix: string
  collections: Record<Locale, DocCollection>
  icon: string
  editBaseUrl?: Partial<Record<Locale, string>>
  contentPathPrefix?: string
  /** Logical index path without locale */
  indexPath?: string
}

export const docSources: DocSource[] = [
  {
    id: 'docs',
    label: 'Documentation',
    prefix: '/docs',
    collections: {
      en: 'docs_en',
      pl: 'docs_pl'
    },
    icon: 'i-lucide-book-open',
    indexPath: '/docs/about'
  },
  {
    id: 'sdk',
    label: 'PHP SDK',
    prefix: '/sdk',
    collections: {
      en: 'sdk_docs_en',
      pl: 'sdk_docs_pl'
    },
    icon: 'i-lucide-package',
    editBaseUrl: {
      en: 'https://github.com/imoli-dev/efl-leasing-sdk/edit/master/docs/en',
      pl: 'https://github.com/imoli-dev/efl-leasing-sdk/edit/master/docs/pl'
    },
    indexPath: '/sdk'
  },
  {
    id: 'wordpress-plugin',
    label: 'WordPress / WooCommerce Plugin',
    prefix: '/wordpress-plugin',
    collections: {
      en: 'wordpress_docs_en',
      pl: 'wordpress_docs_pl'
    },
    icon: 'i-simple-icons-wordpress',
    editBaseUrl: {
      en: 'https://github.com/imoli-dev/efl-leasing-wp-plugin/edit/master/docs/en',
      pl: 'https://github.com/imoli-dev/efl-leasing-wp-plugin/edit/master/docs/pl'
    },
    indexPath: '/wordpress-plugin'
  }
]

export const prefixedDocSources = docSources

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getLocaleFromPath(path: string): Locale | null {
  const segment = path.split('/').filter(Boolean)[0]
  return segment && isLocale(segment) ? segment : null
}

export function stripLocaleFromPath(path: string): { locale: Locale | null, logicalPath: string } {
  const locale = getLocaleFromPath(path)
  if (!locale) {
    return { locale: null, logicalPath: path || '/' }
  }

  const withoutLocale = path.replace(new RegExp(`^/${locale}`), '') || '/'
  return {
    locale,
    logicalPath: withoutLocale.startsWith('/') ? withoutLocale : `/${withoutLocale}`
  }
}

export function withLocalePath(locale: Locale, logicalPath: string): string {
  const normalized = logicalPath === '/' ? '' : (logicalPath.startsWith('/') ? logicalPath : `/${logicalPath}`)
  return normalized ? `/${locale}${normalized}` : `/${locale}`
}

export function getDocSourceById(id: string): DocSource | undefined {
  return docSources.find(s => s.id === id)
}

export function getDocSourceByPrefix(prefix: string): DocSource | undefined {
  const normalized = prefix.replace(/\/$/, '') || '/'
  return docSources.find(s => s.prefix === normalized || s.prefix === prefix)
}

export function getDocSourceByLogicalPath(logicalPath: string): DocSource | undefined {
  const normalized = logicalPath.replace(/\/$/, '') || '/'
  return docSources.find((s) => {
    const sourcePrefix = s.prefix.replace(/\/$/, '')
    return normalized === sourcePrefix || normalized.startsWith(`${sourcePrefix}/`)
  })
}

export function getDocSourceByPath(path: string): DocSource | undefined {
  const { logicalPath } = stripLocaleFromPath(path)
  return getDocSourceByLogicalPath(logicalPath)
}

export function getDocSourceByLocalizedPath(path: string): {
  locale: Locale
  source: DocSource
  logicalPath: string
} | null {
  const { locale, logicalPath } = stripLocaleFromPath(path)
  if (!locale) {
    return null
  }

  const source = getDocSourceByLogicalPath(logicalPath)
  if (!source) {
    return null
  }

  return { locale, source, logicalPath }
}

export function getDocSourceCollection(source: DocSource, locale: Locale): DocCollection {
  return source.collections[locale]
}

export function getLocalizedSourceTo(source: DocSource, locale: Locale): string {
  return withLocalePath(locale, source.prefix)
}

export function getLocalizedIndexPath(source: DocSource, locale: Locale): string {
  return withLocalePath(locale, source.indexPath ?? source.prefix)
}

export function getEditBaseUrl(source: DocSource, locale: Locale): string | undefined {
  if (!source.editBaseUrl) {
    return undefined
  }

  return source.editBaseUrl[locale] ?? source.editBaseUrl[defaultLocale]
}

export function getLandingCollection(locale: Locale): `landing_${Locale}` {
  return `landing_${locale}`
}

export function getCollectionsForLocale(locale: Locale): DocCollection[] {
  return docSources.map(source => source.collections[locale])
}

/** Unwraps root nav item when it matches the prefix (e.g. "Sdk" wrapping all sections). Nuxt Content uses `path`, not `_path`. */
export function unwrapRootNavigation<T extends { _path?: string, path?: string, children?: unknown[] }>(
  items: T[] | undefined,
  urlPrefix: string
): T[] | undefined {
  if (!items || items.length !== 1) return items
  const first = items[0]
  if (!first) return items
  const path = (first._path ?? first.path ?? '').replace(/\/$/, '')
  const prefixNorm = urlPrefix.replace(/\/$/, '')
  const matchesPrefix = path === prefixNorm || path === `${prefixNorm}/`
  if (matchesPrefix && first.children?.length) {
    return first.children as T[]
  }
  return items
}
