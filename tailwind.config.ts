import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chivo: ["var(--font-chivo)"],
        "work-sans": ["var(--font-work-sans)"],
        "ubuntu-mono": ["var(--font-ubuntu-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
