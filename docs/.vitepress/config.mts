import { defineConfig } from "vitepress";

import createSidebar from "./plugins/createSidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小王说前端",
  description:
    "这是一个记录前端相关知识点的博客，包括但不限于js，vue，react，node等。",
  titleTemplate: ":title | 小王",
  lang: "zh-CN",
  themeConfig: {
    sidebar: await createSidebar(),
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wjie1994/blogs' }
    ]
  },
  head: [
    ['meta', { name: 'msvalidate.01', content: '37DF9FCEF8FB058D63E35D0264ED92D8' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-oU4YkaPCds' }],
    [
      'script',
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?9667d5e1bec7584f6b19dfd3313973c7";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ]
  ],
  sitemap: {
    hostname: 'http://jsxwtx.cn'
  },
  lastUpdated: true,
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true
    }
  }
});
