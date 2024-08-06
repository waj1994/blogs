import { defineConfig } from "vitepress";

import createSidebar from "./plugins/createSidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Waj Blog",
  description:
    "欢迎开启一段轻松愉悦的前端之旅。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder。",
  titleTemplate: ":title - Waj Blog",
  lang: "zh-CN",
  themeConfig: {
    sidebar: await createSidebar(),
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/wjie1994/blogs" },
    ],
  },
  head: [
    [
      "meta",
      { name: "msvalidate.01", content: "37DF9FCEF8FB058D63E35D0264ED92D8" },
    ],
    ["meta", { name: "baidu-site-verification", content: "codeva-7WLMk36AAG" }],
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?b3909b0f72d4074ce249a42928802554";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    ],
    [
      "script",
      {},
      `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`,
    ],
    [
      "script",
      {
        defer: "defer",
        src: "/_vercel/speed-insights/script.js",
      },
    ],
  ],
  sitemap: {
    hostname: "https://wj1994.cn",
  },
  lastUpdated: true,
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
});
