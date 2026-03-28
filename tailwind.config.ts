import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#09090f",
          secondary: "#0e0e16",
          tertiary: "#15151f",
          card: "#10101a",
        },
        border: {
          DEFAULT: "#1a1a2e",
          hover: "#2a2a44",
          subtle: "#14142a",
        },
        text: {
          primary: "#f0f0f8",
          secondary: "#9898b0",
          tertiary: "#5a5a78",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
          muted: "rgba(99, 102, 241, 0.1)",
          glow: "rgba(99, 102, 241, 0.2)",
        },
        cyan: {
          DEFAULT: "#22d3ee",
          muted: "rgba(34, 211, 238, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(99, 102, 241, 0.2)",
        "glow-sm": "0 0 25px -5px rgba(99, 102, 241, 0.15)",
        "glow-accent": "0 0 15px rgba(99, 102, 241, 0.15)",
        card: "0 2px 8px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.2)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-drift": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(2%, -1%) rotate(1deg)" },
          "66%": { transform: "translate(-1%, 2%) rotate(-1deg)" },
          "100%": { transform: "translate(1%, -2%) rotate(0.5deg)" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 12px))" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        aurora: "aurora-drift 25s ease-in-out infinite alternate",
        "scroll-x": "scroll-x 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
