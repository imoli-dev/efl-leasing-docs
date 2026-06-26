import type { DocCollection, Locale } from '../config/docs-sources'
import {
  defaultLocale,
  docSources,
  getDocSourceByLogicalPath,
  getDocSourceCollection,
  getLandingCollection,
  getLocalizedIndexPath,
  stripLocaleFromPath,
  withLocalePath
} from '../config/docs-sources'

export type LocaleSwitchReason = 'missing_translation' | 'no_source_index' | 'no_landing'

export interface LocaleSwitchResult {
  to: string
  fallback: boolean
  reason?: LocaleSwitchReason
}

export interface PageExistsChecker {
  (collection: DocCollection | `landing_${Locale}`, logicalPath: string): Promise<boolean>
}

export function buildLocaleSwitchResult(
  targetLocale: Locale,
  logicalPath: string,
  options: {
    sourceExistsInTarget: boolean
    sourceIndexExists: boolean
    landingExists: boolean
  }
): LocaleSwitchResult {
  const source = getDocSourceByLogicalPath(logicalPath)

  if (source) {
    if (options.sourceExistsInTarget) {
      return {
        to: withLocalePath(targetLocale, logicalPath),
        fallback: false
      }
    }

    if (options.sourceIndexExists) {
      return {
        to: withLocalePath(targetLocale, source.prefix),
        fallback: true,
        reason: 'missing_translation'
      }
    }

    return {
      to: withLocalePath(targetLocale, '/docs'),
      fallback: true,
      reason: 'no_source_index'
    }
  }

  if (options.landingExists) {
    return {
      to: withLocalePath(targetLocale, '/'),
      fallback: false
    }
  }

  return {
    to: withLocalePath(targetLocale, '/docs'),
    fallback: true,
    reason: 'no_landing'
  }
}

export async function resolveLocaleSwitchWithChecker(
  targetLocale: Locale,
  currentPath: string,
  pageExists: PageExistsChecker
): Promise<LocaleSwitchResult> {
  const { logicalPath } = stripLocaleFromPath(currentPath)
  const source = getDocSourceByLogicalPath(logicalPath)
  const docsSource = docSources[0]

  if (source) {
    const collection = getDocSourceCollection(source, targetLocale)
    const sourceExistsInTarget = await pageExists(collection, logicalPath)
    const sourceIndexLogical = source.indexPath ?? source.prefix
    const sourceIndexExists = sourceExistsInTarget
      ? true
      : await pageExists(collection, sourceIndexLogical)

    return buildLocaleSwitchResult(targetLocale, logicalPath, {
      sourceExistsInTarget,
      sourceIndexExists,
      landingExists: await pageExists(getLandingCollection(targetLocale), '/')
    })
  }

  const landingExists = await pageExists(getLandingCollection(targetLocale), '/')

  return buildLocaleSwitchResult(targetLocale, logicalPath, {
    sourceExistsInTarget: false,
    sourceIndexExists: docsSource
      ? await pageExists(getDocSourceCollection(docsSource, targetLocale), docsSource.indexPath ?? docsSource.prefix)
      : false,
    landingExists
  })
}

export function getDocFallbackPath(locale: Locale, logicalPath: string): string {
  const source = getDocSourceByLogicalPath(logicalPath)
  if (source) {
    return getLocalizedIndexPath(source, locale)
  }

  return withLocalePath(locale, '/docs')
}

export function getCurrentLocaleFromPath(path: string): Locale {
  return stripLocaleFromPath(path).locale ?? defaultLocale
}
