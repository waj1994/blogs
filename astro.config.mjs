import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://wj1994.cn',
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
    }),
    UnoCSS({
      injectReset: true,
    }),
    icon(),
  ],
})
