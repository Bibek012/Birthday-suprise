import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF8FA",
          100: "#FFEFF4",
          200: "#FFD6E8",
          300: "#FFB8D9",
        },
        rose: {
          400: "#FF8FB3",
          500: "#F76B9C",
          600: "#E94F8A",
          700: "#C93470",
        },
        plum: {
          800: "#4A1942",
          900: "#33102E",
        },
        gold: {
          400: "#F0C674",
          500: "#E8B84B",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        script: ["var(--font-dancing)", "cursive"],
        body: ["var(--font-quicksand)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) translateX(8px) rotate(8deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(-4deg)" },
          "50%": { transform: "translateY(-40px) rotate(4deg)" },
        },
        flicker: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)", opacity: "1" },
          "50%": { transform: "scaleY(1.15) scaleX(0.92)", opacity: "0.85" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "ribbon-open-left": {
          "0%": { transform: "rotate(0deg) translateX(0)" },
          "100%": { transform: "rotate(-95deg) translateX(-30%)" },
        },
        "ribbon-open-right": {
          "0%": { transform: "rotate(0deg) translateX(0)" },
          "100%": { transform: "rotate(95deg) translateX(30%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        flicker: "flicker 0.7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
