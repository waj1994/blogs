import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default <Partial<Config>>{
  darkMode: "class",
  plugins: [typography()],
  theme: {
    extend: {
      colors: {
        primary: "#00C16A",
      },
      fontFamily: {
        sans: [
          'Inter, "Inter Fallback: Arial",ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        ],
      },
    },
  },
};
