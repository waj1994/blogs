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
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=0',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'dns-prefetch', href: 'https://www.jsxwtx.cn' }],
    [
      'script',
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?e038ce4bbd9a46f547637490e22e2cd6";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    ],
  ],
  theme: '@vuepress/blog',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
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
          text: '渝ICP备2023017543号',
          link: 'https://beian.miit.gov.cn',
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
