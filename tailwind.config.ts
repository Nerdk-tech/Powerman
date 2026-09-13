import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2540",
          50: "#F2F6FA",
          100: "#E1EAF2",
          200: "#C3D4E4",
          300: "#9AB8D1",
          400: "#6D97BB",
          500: "#4B7BA3",
          600: "#355F84",
          700: "#24465F",
          800: "#16324A",
          900: "#0A2540",
        },
        volt: {
          DEFAULT: "#2ECC71",
          50: "#EAFBF2",
          100: "#D1F5E3",
          200: "#A3EAC8",
          300: "#6BDBA6",
          400: "#3FCB86",
          500: "#2ECC71",
          600: "#1FA55A",
          700: "#188448",
          800: "#136839",
          900: "#0F4E2D",
        },
        charcoal: "#2B2B2B",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(10,37,64,0.08), 0 4px 14px rgba(10,37,64,0.06)",
        "card-hover": "0 6px 18px rgba(10,37,64,0.14), 0 12px 32px rgba(10,37,64,0.10)",
        glow: "0 0 24px rgba(46,204,113,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
