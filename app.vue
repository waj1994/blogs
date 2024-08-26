<script
  setup
  lang="ts"
>
import { SpeedInsights } from '@vercel/speed-insights/vue'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3',
    },
  ],
  meta: [
    {
      name: 'msvalidate.01',
      content: '9D41D43776743EEA9312CE08774752B8',
    },
    {
      name: 'baidu-site-verification',
      content: 'codeva-5bBM7Az3mp',
    },
    {
      name: 'google-site-verification',
      content: 'Qp6MuYYJvqPH7bFrnlQOiITOwD80iZ0x0BoYBehEUaQ',
    },
    {
      name: 'google-og:type',
      content: 'article',
    },
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@docsearch/js@3',
    },
  ],
})

onMounted(() => {
  useHead({
    script: [
      {
        async: true,
        innerHTML: `
          docsearch({
            appId: "EAFR0MP54B",
            apiKey: "d3376758222b1d4b9424b882b2dbd64b",
            indexName: "waj9",
            container: "#search-container",
            debug: false 
          });
        `,
      },
      {
        async: true,
        innerHTML: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?11023a824985cf7b4d35a0e8da1f6811";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      },
      {
        async: true,
        innerHTML: `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`,
      },
    ],
  })
})
</script>

<template>
  <Header />
  <main class="min-h-[calc(100vh-var(--header-height))] mr-[calc(100vw-100%)]">
    <NuxtPage />
  </main>
  <MobileNav />
  <SpeedInsights />
</template>

<style lang="less">
@import '~/assets/styles/markdown-body.less';

* {
  transition: all 0.01s linear;
}

html {
  scroll-behavior: smooth;
  /** 解决滚动条挤压页面的问题  */
  scrollbar-gutter: stable;
}

body {
  --header-height: 64px;
  @apply bg-white dark:bg-gray-950 leading-[1.75];
}

.anchor {
  position: relative;
  top: -96px; // 偏移值
  display: block;
  height: 0;
  overflow: hidden;
}

.DocSearch-Button {
  height: 32px;
  border-radius: 5px;
  background-color: #f6f6f7;
}

.dark .DocSearch-Button {
  background-color: #161618;
}
</style>
