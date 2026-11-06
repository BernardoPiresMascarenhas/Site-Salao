import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        cacau: {
          950: "#140E0C",
          900: "#211A18",
          850: "#2A211E",
          800: "#332824",
          700: "#4A3B35",
        },
        bronze: {
          200: "#E2CCBD",
          300: "#CDAE99",
          400: "#BA937C",
          500: "#A57C65",
          600: "#8A6450",
          700: "#6E4F3F",
        },
        areia: {
          DEFAULT: "#E5D8C8",
          soft: "#EFE6DB",
        },
        linho: "#F8F4EF",
        rose: "#D8B6A9",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", '"Bodoni 72"', "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        "scroll-line": "scroll-line 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
