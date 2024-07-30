import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  presetUno
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'icon-btn': 'opacity-50 hover:opacity-100 dark:text-white'
    }
  ],
  transformers: [transformerDirectives()],
  theme: {
    breakpoints: {
      sm: '540px',
      md: '735px',
      xl: '1070px'
    }
  },
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ]
})
