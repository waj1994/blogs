import { defineConfig } from "vitepress";

import createSidebar from "./plugins/createSidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小王说前端",
  description:
    "欢迎来到一个跟前端相关的博客。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的一些比较难搞的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder。",
  titleTemplate: ":title - 小王说前端",
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
    ["meta", { name: "baidu-site-verification", content: "codeva-BH1TEgYZiB" }],
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?6efafa5697ff9b6048a64146c3d58fa7";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
    ],
  ],
  sitemap: {
    hostname: "https://wjie1994.com",
  },
  lastUpdated: true,
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
});
