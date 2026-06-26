export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'EFL Leasing Docs'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/imoli-dev/efl-leasing-sdk',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  footer: {
    credits: `EFL Leasing • © ${new Date().getFullYear()}`,
    author: {
      name: 'Imoli',
      url: 'https://imoli.dev'
    },
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/imoli-dev/efl-leasing-sdk',
      'target': '_blank',
      'aria-label': 'EFL Leasing SDK on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Resources',
      edit: 'https://github.com/imoli-dev/efl-leasing-sdk/edit/master/docs',
      links: [{
        icon: 'i-lucide-star',
        label: 'SDK on GitHub',
        to: 'https://github.com/imoli-dev/efl-leasing-sdk',
        target: '_blank'
      }, {
        icon: 'i-lucide-package',
        label: 'SDK Documentation',
        to: '/en/sdk'
      }]
    }
  }
})
