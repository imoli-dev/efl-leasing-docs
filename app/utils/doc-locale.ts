import type { DocSource, Locale } from '~/config/docs-sources'
import { defaultLocale } from '~/config/docs-sources'

const localeNames: Record<Locale, Record<Locale, string>> = {
  en: {
    en: 'English',
    pl: 'Polish'
  },
  pl: {
    en: 'angielskim',
    pl: 'polskim'
  }
}

export function isSharedLocaleCollection(source: DocSource): boolean {
  return source.collections.en === source.collections.pl
}

/** Language the markdown content is written in for the current UI locale. */
export function getSourceContentLocale(source: DocSource, uiLocale: Locale): Locale {
  if (!isSharedLocaleCollection(source)) {
    return uiLocale
  }

  return source.contentLocale ?? defaultLocale
}

export function isContentLocaleMismatch(source: DocSource, uiLocale: Locale): boolean {
  return getSourceContentLocale(source, uiLocale) !== uiLocale
}

export function getLocaleNameInUiLanguage(uiLocale: Locale, locale: Locale): string {
  return localeNames[uiLocale][locale] ?? locale.toUpperCase()
}

export function buildContentLocaleMismatchMessage(
  uiLocale: Locale,
  contentLocale: Locale
): string {
  const uiName = getLocaleNameInUiLanguage(uiLocale, uiLocale)
  const contentName = getLocaleNameInUiLanguage(uiLocale, contentLocale)

  if (uiLocale === 'pl') {
    return `Ta dokumentacja nie jest dostępna w języku ${uiName}. Poniższa treść jest wyświetlana w języku ${contentName}.`
  }

  return `This documentation is not available in ${uiName}. The content below is shown in ${contentName}.`
}
