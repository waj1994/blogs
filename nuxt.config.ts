// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    analyze: {
      filename: 'stats.html',
    },
  },
  nitro: {
    prerender: {
      // enabled by default with nuxt generate, not required
      crawlLinks: true,
      // add any routes to prerender
      routes: ['/']
    }
  },
  devtools: { enabled: false },
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],

  icon: {
    provider: 'server',
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons',
      },
    ],
  },

  routeRules: {
    '/': { prerender: true },
  },

  site: {
    url: 'https://waj9.cn',
    name: 'waj blog',
    description:
      '欢迎开启一段轻松愉悦的前端之旅。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder！',
  },

  sitemap: {
    exclude: ['/detail'],
  },

  compatibilityDate: '2024-08-14',

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: [
        'json',
        'json5',
        'js',
        'ts',
        'html',
        'css',
        'vue',
        'diff',
        'shell',
        'markdown',
        'yaml',
        'bash',
        'ini',
        'tsx',
        'jsx',
        'shell',
        'javascript',
      ],
    },
    navigation: {
      fields: ['icon'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
