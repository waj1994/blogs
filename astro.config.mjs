import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "unocss/astro";
import icon from "astro-icon";
import starlightDocSearch from "@astrojs/starlight-docsearch";
import { SITE_TITLE } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: "https://wj1994.cn",
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
    }),
    UnoCSS({
      injectReset: true,
    }),
    icon(),
    starlightDocSearch({
      appId: "YOUR_APP_ID",
      apiKey: "YOUR_SEARCH_API_KEY",
      indexName: SITE_TITLE,
    }),
  ],
});
