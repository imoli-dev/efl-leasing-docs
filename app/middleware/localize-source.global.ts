import {
  defaultLocale,
  getDocSourceByLogicalPath,
  getLocaleFromPath,
  isLocale,
  withLocalePath
} from '~/config/docs-sources'

/**
 * Content from external repositories uses non-localized absolute links such as
 * `/sdk/getting-started`. Those paths have no matching route (routes are
 * `/[locale]/[source]/...`) and would 404. Redirect any non-localized doc-source
 * path to the locale of the current page, falling back to the default locale.
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const firstSegment = to.path.split('/').filter(Boolean)[0]

  if (!firstSegment || isLocale(firstSegment)) {
    return
  }

  const source = getDocSourceByLogicalPath(to.path)
  if (!source) {
    return
  }

  const targetLocale = getLocaleFromPath(from?.path ?? '') ?? defaultLocale

  return navigateTo({
    path: withLocalePath(targetLocale, to.path),
    query: to.query,
    hash: to.hash
  }, { redirectCode: 301 })
})
