const baseUrl = 'https://laddge.github.io/blog'

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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Linux大好き高校生' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Laddge\'s Blog' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:title', property: 'og:title', content: 'Laddge\'s Blog' },
      { hid: 'og:description', property: 'og:description', content: 'Linux大好き高校生' },
      { hid: 'og:image', property: 'og:image', content: 'https://res.cloudinary.com/laddge/image/upload/f_auto,q_auto/v1648961119/laddge.net/laddge.png' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@laddge_' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'https://res.cloudinary.com/laddge/image/upload/f_auto,q_auto/v1648961119/laddge.net/laddge.png' },
      { rel: 'apple-touch-icon', type: 'image/png', href: 'https://res.cloudinary.com/laddge/image/upload/f_auto,q_auto,c_scale,w_180,h_180/v1648961119/laddge.net/laddge.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' }
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
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }],
    '@nuxtjs/google-fonts',
    '@nuxtjs/axios'
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

  publicRuntimeConfig: {
    baseUrl
  },

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-coldark-dark.css'
      },
      remarkPlugins: (plugins) => {
        const denyList = ['remark-autolink-headings']
        return plugins.filter(plugin => !denyList.includes(plugin))
      }
    }
  },

  fontawesome: {
    icons: {
      solid: [
        'faBars',
        'faXmark',
        'faMagnifyingGlass',
        'faChevronLeft',
        'faChevronRight'
      ],
      regular: [
        'faCalendar',
        'faFolder'
      ],
      brands: [
        'faGithub',
        'faTwitter',
        'faInstagram'
      ]
    }
  },

  googleFonts: {
    families: {
      'Noto+Sans+JP': [400, 500, 700]
    },
    display: 'swap',
    download: false
  }
}
