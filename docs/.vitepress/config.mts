import { defineConfig } from "vitepress";

import sidebar from "./plugins/createSidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Waj Blog",
  description:
    "欢迎开启一段轻松愉悦的前端之旅。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder。",
  titleTemplate: ":title - Waj Blog",
  lang: "zh-CN",
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "博客", link: "/blog/cache", activeMatch: "/blog/" },
      { text: "关于我", link: "/about/" },
    ],
    // ts-ignore
    sidebar: {
      "/blog/": sidebar,
    },
    search: {
      provider: "algolia",
      options: {
        appId: "OJX6CFBBL3",
        apiKey: "515650c636818739ec952b6eab2c9352",
        indexName: "waj9",
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/wjie1994/blogs" },
      {
        icon: {
          svg: `<svg width="25" heigh="25" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" fill="currentColor"></path>
          </svg>`,
        },
        link: "mailto:wjie2021@163.com",
      },
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
  head: [
    [
      "meta",
      { name: "msvalidate.01", content: "9D41D43776743EEA9312CE08774752B8" },
    ],
    ["meta", { name: "baidu-site-verification", content: "codeva-5bBM7Az3mp" }],

// <meta name="google-site-verification" content="Qp6MuYYJvqPH7bFrnlQOiITOwD80iZ0x0BoYBehEUaQ" />

    [
      "meta",
      {
        name: "google-site-verification",
        content: "Qp6MuYYJvqPH7bFrnlQOiITOwD80iZ0x0BoYBehEUaQ",
      },
    ],
    ["meta", { name: "og:title", content: "Waj Blog" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:url", content: "https://waj9.cn" }],
    [
      "meta",
      {
        name: "og:description",
        content:
          "欢迎开启一段轻松愉悦的前端之旅。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder。",
      },
    ],
    ["meta", { name: "og:image", content: "/image/js.jpg" }],
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?11023a824985cf7b4d35a0e8da1f6811";
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
    hostname: "https://waj9.cn",
  },
  lastUpdated: true,
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
});
