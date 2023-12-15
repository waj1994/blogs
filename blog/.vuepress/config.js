const path = require('path');

module.exports = {
  alias: {
    '@assets': path.resolve(__dirname, '../assets'),
  },
  title: '小王',
  description: 'web开发,前端开发,javascript,react',
  head: [
    ['meta', { name: 'keyword', content: '前端, javascript, vue, react, git' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-bbNA5LdLps' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  theme: '@vuepress/blog',
  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: '学海无涯', link: '/study/' },
      { text: '苦作舟', link: '/pit/' },
    ],
    directories: [
      {
        id: 'study',
        dirname: 'study',
        title: '学海无涯',
        path: '/study/',
        itemPermalink: '/study/:slug',
      },
      {
        id: 'pit',
        dirname: 'pit',
        title: '苦作舟',
        path: '/pit/',
        itemPermalink: '/pit/:slug',
      },
    ],

    footer: {
      // 备案信息
      copyright: [
        {
          text: '',
          link: '',
        },
      ],
    },
  },
  plugins: {
    sitemap: {
      hostname: 'https://jsxwtx.cn',
    },
  },
  markdown: {
    externalLinks: { target: '_blank', rel: 'nofollow noopener noreferrer' },
  },
};
