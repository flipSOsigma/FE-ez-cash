import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hm: "#ff9f9f",
        as: "#ffffAf",
        fb: "#ff9fd2",
        tr: "#bc9fff",
        sp: "#9ef7ff",
        hs: "#537ff1",
        ur: "#53f1a2",
        ot: "#f19753",
      },
    },
  },
  plugins: [],
} satisfies Config;
