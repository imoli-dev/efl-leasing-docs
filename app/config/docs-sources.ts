/** Names of the page-type content collections defined in content.config.ts. */
export type DocCollection = 'docs' | 'sdk_docs' | 'wordpress_docs'

export interface DocSource {
  id: string
  label: string
  prefix: string
  collection: DocCollection
  to: string
  icon: string
  editBaseUrl?: string
  contentPathPrefix?: string
  indexPath?: string
}

export const docSources: DocSource[] = [
  {
    id: 'docs',
    label: 'Documentation',
    prefix: '/docs',
    collection: 'docs',
    to: '/docs',
    icon: 'i-lucide-book-open',
    indexPath: '/docs/about'
  },
  {
    id: 'sdk',
    label: 'PHP SDK',
    prefix: '/sdk',
    collection: 'sdk_docs',
    to: '/sdk',
    icon: 'i-lucide-package',
    editBaseUrl: 'https://github.com/imoli-dev/efl-leasing-sdk/edit/master/docs',
    indexPath: '/sdk'
  },
  {
    id: 'wordpress-plugin',
    label: 'WordPress / WooCommerce Plugin',
    prefix: '/wordpress-plugin',
    collection: 'wordpress_docs',
    to: '/wordpress-plugin',
    icon: 'i-simple-icons-wordpress',
    editBaseUrl: 'https://github.com/imoli-dev/efl-leasing-wp-plugin/edit/master/docs',
    indexPath: '/wordpress-plugin'
  }
  // {
  //   id: 'shoper-app',
  //   label: 'Shoper App',
  //   prefix: '/shoper-app',
  //   collection: 'shoper_docs',
  //   to: '/shoper-app',
  //   icon: 'i-lucide-shopping-bag',
  //   indexPath: '/shoper-app'
  // }
]

export const prefixedDocSources = docSources

export function getDocSourceById(id: string): DocSource | undefined {
  return docSources.find(s => s.id === id)
}

export function getDocSourceByPrefix(prefix: string): DocSource | undefined {
  return docSources.find(s => s.prefix === prefix)
}

export function getDocSourceByPath(path: string): DocSource | undefined {
  return docSources.find(s => path.startsWith(s.prefix))
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
