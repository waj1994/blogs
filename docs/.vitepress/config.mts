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
  sitemap: {
    hostname: 'http://jsxwtx.cn'
  },
  lastUpdated: true,
});
