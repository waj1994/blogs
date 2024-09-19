import { defineConfig } from "vitepress";
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

import sidebar from "./plugins/createSidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Waj Blog",
  description:
    "欢迎开启一段轻松愉悦的前端之旅。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder。",
  titleTemplate: ":title - Waj Blog",
  lang: "zh-CN",
  rewrites: {
    "about.md": "index.md",
  },
  cleanUrls: true,
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "前端", link: "/frontend/http/cache", activeMatch: "/frontend/" },
      { text: "关于我", link: "/" },
    ],
    sidebar: {
      "/frontend/": await sidebar("../../frontend"),
    },
    search: {
      provider: "algolia",
      options: {
        appId: "EAFR0MP54B",
        apiKey: "46f0d6a17f8bd194814f4bb556b324a4",
        indexName: "waj9",
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/waj1994/blogs" },
      {
        icon: {
          svg: `<svg width="25" heigh="25" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" fill="currentColor"></path>
          </svg>`,
        },
        link: "mailto:waj2024@126.com",
      },
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: [2, 3],
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
    [
      "meta",
      {
        name: "google-site-verification",
        content: "Qp6MuYYJvqPH7bFrnlQOiITOwD80iZ0x0BoYBehEUaQ",
      },
    ],
    [
      "script",
      {
        type: "module",
      },
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
      {
        type: "module",
      },
      `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`,
    ],
    [
      "script",
      {
        type: "module",
        src: "/_vercel/speed-insights/script.js",
      },
    ],
    [
      "style",
      {},
      `
        html {
          scrollbar-gutter: stable;
        }
      `,
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
    // @ts-ignore
    codeTransformers: [transformerTwoslash()],
  },
});