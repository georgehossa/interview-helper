import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e1320",
        surface: "#151b2b",
        border: "#262f47",
        muted: "#8a94ad",
        dim: "#5a6483",
        ink: "#e6eaf3",
        codebg: "#0b0f1a",
        codetext: "#cdd6e8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;