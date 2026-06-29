import { describe, expect, it } from 'vitest'
import {
  getDocSourceByLogicalPath,
  getDocSourceByPath,
  getLocaleFromPath,
  stripLocaleFromPath,
  withLocalePath
} from '../../app/config/docs-sources'
import { buildLocaleSwitchResult, resolveLocaleSwitchWithChecker } from '../../app/utils/locale-switch'

describe('docs-sources path helpers', () => {
  it('extracts locale from localized paths', () => {
    expect(getLocaleFromPath('/en/sdk/installation')).toBe('en')
    expect(getLocaleFromPath('/pl/docs/about')).toBe('pl')
    expect(getLocaleFromPath('/sdk')).toBeNull()
  })

  it('strips locale and keeps logical path', () => {
    expect(stripLocaleFromPath('/en/sdk/installation')).toEqual({
      locale: 'en',
      logicalPath: '/sdk/installation'
    })
  })

  it('builds localized paths', () => {
    expect(withLocalePath('pl', '/sdk')).toBe('/pl/sdk')
    expect(withLocalePath('en', '/')).toBe('/en')
  })

  it('finds doc source from localized path', () => {
    expect(getDocSourceByPath('/pl/wordpress-plugin/setup')?.id).toBe('wordpress-plugin')
    expect(getDocSourceByLogicalPath('/sdk/guides/foo')?.id).toBe('sdk')
  })
})

describe('locale switch resolver', () => {
  it('switches to the same page when translation exists', () => {
    const result = buildLocaleSwitchResult('pl', '/sdk/installation', {
      sourceExistsInTarget: true,
      sourceIndexExists: true,
      landingExists: true
    })

    expect(result).toEqual({
      to: '/pl/sdk/installation',
      fallback: false
    })
  })

  it('falls back to source index when translation is missing', () => {
    const result = buildLocaleSwitchResult('pl', '/sdk/installation', {
      sourceExistsInTarget: false,
      sourceIndexExists: true,
      landingExists: true
    })

    expect(result).toEqual({
      to: '/pl/sdk',
      fallback: true,
      reason: 'missing_translation'
    })
  })

  it('falls back to docs when source index is missing', () => {
    const result = buildLocaleSwitchResult('pl', '/sdk/installation', {
      sourceExistsInTarget: false,
      sourceIndexExists: false,
      landingExists: true
    })

    expect(result).toEqual({
      to: '/pl/docs',
      fallback: true,
      reason: 'no_source_index'
    })
  })

  it('switches the docs index without fallback when only the index page exists', async () => {
    // The docs source renders its index from /docs/about, so there is no literal
    // page at /docs. Switching from /pl/docs should be a clean switch.
    const pageExists = async (_collection: string, logicalPath: string) =>
      logicalPath === '/docs/about' || logicalPath === '/en'

    const result = await resolveLocaleSwitchWithChecker('en', '/pl/docs', pageExists)

    expect(result).toEqual({
      to: '/en/docs',
      fallback: false
    })
  })
})
