import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#00C16A'
        },
      },
      fontFamily: {
        sans: [
          'Inter, "Inter Fallback: Arial",ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        ],
      },
    },
  },
}
