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

  // Pin the canonical site URL so generated links (LLM actions, OG images, etc.)
  // never leak the per-deployment Vercel URL that nuxt-site-config auto-detects.
  site: {
    url: siteUrl,
    name: 'EFL Leasing Docs'
  },

  content: {
    // Use Node's built-in SQLite connector (node:sqlite, Node >= 22.5.0).
    // The default `better-sqlite3` native binding fails to load in the
    // serverless runtime ("Module did not self-register"), see nuxt/content#3689.
    experimental: {
      sqliteConnector: 'native'
    },
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
        '/pl',
        '/en/docs',
        '/pl/docs',
        '/en/sdk',
        '/pl/sdk',
        '/en/wordpress-plugin',
        '/pl/wordpress-plugin'
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
    // Disable @nuxt/content's built-in /raw/**.md route. It queries the URL path
    // verbatim (e.g. /en/sdk), but our content is stored under locale-stripped
    // logical paths (e.g. /sdk), so it 404s. Our own locale-aware handler in
    // server/routes/raw/[...slug].md.get.ts handles these requests instead.
    contentRawMarkdown: false,
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
        contentCollection: 'wordpress_docs',
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
