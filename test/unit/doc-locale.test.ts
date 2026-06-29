import { describe, expect, it } from 'vitest'
import { docSources } from '../../app/config/docs-sources'
import {
  buildContentLocaleMismatchMessage,
  getSourceContentLocale,
  isContentLocaleMismatch,
  isSharedLocaleCollection
} from '../../app/utils/doc-locale'

describe('doc locale helpers', () => {
  it('detects shared collections', () => {
    const wordpress = docSources.find(source => source.id === 'wordpress-plugin')!
    const sdk = docSources.find(source => source.id === 'sdk')!

    expect(isSharedLocaleCollection(wordpress)).toBe(true)
    expect(isSharedLocaleCollection(sdk)).toBe(false)
  })

  it('reports content locale mismatch for shared Polish docs on English UI', () => {
    const wordpress = docSources.find(source => source.id === 'wordpress-plugin')!

    expect(getSourceContentLocale(wordpress, 'en')).toBe('pl')
    expect(isContentLocaleMismatch(wordpress, 'en')).toBe(true)
    expect(isContentLocaleMismatch(wordpress, 'pl')).toBe(false)
  })

  it('does not report mismatch for fully localized sources', () => {
    const sdk = docSources.find(source => source.id === 'sdk')!

    expect(isContentLocaleMismatch(sdk, 'en')).toBe(false)
    expect(isContentLocaleMismatch(sdk, 'pl')).toBe(false)
  })

  it('builds localized mismatch messages', () => {
    expect(buildContentLocaleMismatchMessage('en', 'pl')).toContain('Polish')
    expect(buildContentLocaleMismatchMessage('pl', 'en')).toContain('angielskim')
  })
})
