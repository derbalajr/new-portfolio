import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    // Replaced, not extended — these mirror the design artifact's media queries.
    screens: {
      sm: "480px",
      md: "720px",
      lg: "900px",
      xl: "1180px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        bg: { DEFAULT: "#05070c", "2": "#080d15" },
        panel: { DEFAULT: "#0c121c", "2": "#101825" },
        line: {
          DEFAULT: "rgba(233,240,250,0.10)",
          "2": "rgba(233,240,250,0.18)",
        },
        txt: "#e9f0fa",
        dim: { DEFAULT: "#8d9aad", "2": "#5d6979" },
        accent: { DEFAULT: "#4c6fff", soft: "#7d95ff" },
        teal: "#24d8c4",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
