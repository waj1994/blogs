// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetAttributify({ strict: true }), presetUno({ dark: 'class' })],
  shortcuts: {
    'icon-btn': 'opacity-50 hover:opacity-100 dark:text-white',
    ellipsis: 'whitespace-normal text-ellipsis overflow-hidden',
  },
  theme: {
    breakpoints: {
      sm: '540px',
      md: '735px',
      xl: '1070px',
    },
  },
});
