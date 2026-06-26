import type { ContentNavigationItem } from '@nuxt/content'

export function mapNavigationPaths(
  items: ContentNavigationItem[] | undefined,
  urlPrefix: string,
  contentPathPrefix?: string
): ContentNavigationItem[] | undefined {
  if (!items) return items

  return items.map((item) => {
    const itemPath = (item as { _path?: string })._path
    const mappedPath = itemPath
      ? (contentPathPrefix
          ? itemPath.replace(contentPathPrefix, urlPrefix)
          : (itemPath === '/' ? urlPrefix : urlPrefix + itemPath))
      : ((item as { path?: string }).path ?? '')
    return {
      ...item,
      _path: mappedPath,
      path: mappedPath,
      children: item.children
        ? mapNavigationPaths(item.children as ContentNavigationItem[], urlPrefix, contentPathPrefix)
        : item.children
    }
  })
}

export function ensurePathOnNavItems(items: ContentNavigationItem[]): ContentNavigationItem[] {
  return items.map(item => ({
    ...item,
    path: (item as { path?: string }).path ?? (item as { _path?: string })._path ?? '',
    children: item.children
      ? ensurePathOnNavItems(item.children as ContentNavigationItem[])
      : item.children
  }))
}
