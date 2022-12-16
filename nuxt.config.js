import * as FontAwesome from './build/fontawesome'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Laddge\'s Blog',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-content-git',
    '@nuxt/content',
    '@nuxtjs/date-fns',
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },

  generate: {
    fallback: true
  },

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-gruvbox-dark.css'
      },
      remarkPlugins: (plugins) => {
        const denyList = ['remark-autolink-headings']
        return plugins.filter(plugin => !denyList.includes(plugin))
      }
    }
  },

  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands
    }
  }
}
