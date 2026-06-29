import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const githubAuth = {
  username: 'x-access-token',
  token: process.env.GITHUB_TOKEN
}

const sdkLinksSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional()
  })).optional()
})

export default defineContentConfig({
  collections: {
    landing_en: defineCollection({
      type: 'page',
      source: 'en/index.md'
    }),

    landing_pl: defineCollection({
      type: 'page',
      source: 'pl/index.md'
    }),

    docs_en: defineCollection({
      type: 'page',
      source: {
        include: 'docs/en/**',
        prefix: '/docs'
      }
    }),

    docs_pl: defineCollection({
      type: 'page',
      source: {
        include: 'docs/pl/**',
        prefix: '/docs'
      }
    }),

    sdk_docs_en: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/imoli-dev/efl-leasing-sdk',
          branch: 'master',
          auth: githubAuth
        },
        include: 'docs/en/**',
        prefix: '/sdk'
      },
      schema: sdkLinksSchema
    }),

    sdk_docs_pl: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/imoli-dev/efl-leasing-sdk',
          branch: 'master',
          auth: githubAuth
        },
        include: 'docs/pl/**',
        prefix: '/sdk'
      },
      schema: sdkLinksSchema
    }),

    // PrestaShop repositories ship docs in a single language only, so each
    // collection is shared under both locales until translated folders are added.
    prestashop_docs: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/imoli-dev/efl-leasing-prestashop-module',
          branch: 'master',
          auth: githubAuth
        },
        include: 'docs/**',
        prefix: '/prestashop-module'
      }
    }),

    prestashop17_docs: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/imoli-dev/efl-leasing-prestashop17-module',
          branch: 'master',
          auth: githubAuth
        },
        include: 'docs/**',
        prefix: '/prestashop17-module'
      }
    }),

    // The WordPress repository still ships docs in a single language only, so it
    // remains shared under both locales until translated folders are added there.
    wordpress_docs: defineCollection({
      type: 'page',
      source: {
        repository: {
          url: 'https://github.com/imoli-dev/efl-leasing-wp-plugin',
          branch: 'master',
          auth: githubAuth
        },
        include: 'docs/**',
        prefix: '/wordpress-plugin'
      }
    })
  }
})
