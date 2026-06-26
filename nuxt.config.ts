// https://nuxt.com/docs/api/configuration/nuxt-config

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://efl-leasing.imoli.pl'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit',
    '@nuxt/a11y',
    '@nuxt/hints',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        },
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'php']
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      siteUrl
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/',
        '/en',
        '/pl'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false,
      failOnError: false
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: siteUrl,
    title: 'EFL Leasing Docs',
    description: 'Documentation for EFL Leasing integrations, including the PHP SDK.',
    full: {
      title: 'EFL Leasing Docs - Full Documentation',
      description: 'Full documentation for EFL Leasing integrations and the PHP SDK.'
    },
    sections: [
      {
        title: 'SDK Getting Started',
        contentCollection: 'sdk_docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/sdk/getting-started%' }
        ]
      },
      {
        title: 'SDK Installation',
        contentCollection: 'sdk_docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/sdk/installation%' }
        ]
      },
      {
        title: 'SDK Quickstart',
        contentCollection: 'sdk_docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/sdk/quickstart%' }
        ]
      },
      {
        title: 'SDK API Reference',
        contentCollection: 'sdk_docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/sdk/api%' }
        ]
      },
      {
        title: 'SDK Guides',
        contentCollection: 'sdk_docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/sdk/guides%' }
        ]
      },
      {
        title: 'WordPress / WooCommerce Plugin',
        contentCollection: 'wordpress_docs_en',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/wordpress-plugin%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'EFL Leasing Docs'
  }
})
