import type { Config } from "tailwindcss";
import {
  borderRadius,
  boxShadow,
  colors,
  fontSize,
  maxWidth,
  screens,
  spacing,
  transitionDuration,
  transitionTimingFunction,
} from "./styles/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      black: colors.black,
      white: colors.white,
      chartreuse: colors.chartreuse,
      gray: colors.gray,
    },
    fontSize,
    spacing,
    borderRadius,
    boxShadow,
    transitionTimingFunction,
    transitionDuration,
    screens,
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        site: maxWidth.site,
        measure: maxWidth.measure,
      },
      scale: {
        98: "0.98",
      },
    },
  },
  plugins: [],
};

export default config;
