import { describe, expect, it } from 'vitest'
import { unwrapRootNavigation } from '../../app/config/docs-sources'
import { mapNavigationPaths } from '../../app/utils/doc-navigation'

describe('doc navigation', () => {
  it('maps logical paths to localized paths and unwraps the source root', () => {
    const raw = [{
      title: 'Overview',
      path: '/sdk',
      children: [
        { title: 'Getting started', path: '/sdk/getting-started' },
        { title: 'Installation', path: '/sdk/installation' }
      ]
    }]

    const mapped = mapNavigationPaths(raw, '/en/sdk', '/sdk')
    const navigation = unwrapRootNavigation(mapped, '/en/sdk', '/sdk')

    expect(navigation).toHaveLength(2)
    expect(navigation?.[0]).toMatchObject({
      title: 'Getting started',
      path: '/en/sdk/getting-started'
    })
    expect(navigation?.[1]).toMatchObject({
      title: 'Installation',
      path: '/en/sdk/installation'
    })
  })
})
