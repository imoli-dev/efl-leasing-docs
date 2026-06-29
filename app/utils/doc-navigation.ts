import type { ContentNavigationItem } from '@nuxt/content'

function getItemPath(item: ContentNavigationItem): string {
  return (item as { path?: string }).path ?? (item as { _path?: string })._path ?? ''
}

/**
 * Maps logical content paths (e.g. /sdk/getting-started) to localized URL paths
 * (e.g. /en/sdk/getting-started). Pass the source's logical prefix as
 * `logicalPrefix` so the root index can be unwrapped from the sidebar.
 */
export function mapNavigationPaths(
  items: ContentNavigationItem[] | undefined,
  localizedPrefix: string,
  logicalPrefix?: string
): ContentNavigationItem[] | undefined {
  if (!items) {
    return items
  }

  const prefix = logicalPrefix ?? localizedPrefix

  return items.map((item) => {
    const rawPath = getItemPath(item)
    const mappedPath = !rawPath || rawPath === '/'
      ? localizedPrefix
      : rawPath.startsWith(prefix)
        ? `${localizedPrefix}${rawPath.slice(prefix.length)}` || localizedPrefix
        : `${localizedPrefix}${rawPath.startsWith('/') ? rawPath : `/${rawPath}`}`

    return {
      ...item,
      _path: mappedPath,
      path: mappedPath,
      children: item.children
        ? mapNavigationPaths(item.children as ContentNavigationItem[], localizedPrefix, prefix)
        : item.children
    }
  })
}

export function ensurePathOnNavItems(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.map(item => ({
    ...item,
    path: getItemPath(item),
    children: item.children
      ? ensurePathOnNavItems(item.children as ContentNavigationItem[])
      : item.children
  }))
}
