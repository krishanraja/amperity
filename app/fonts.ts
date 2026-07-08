import localFont from "next/font/local";

/**
 * Self-hosted latin-subset variable fonts. next/font tunes fallback
 * metrics (size-adjust) automatically so font load causes zero layout
 * shift.
 */

export const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-display",
});

export const inter = localFont({
  src: "../fonts/inter-latin-opsz-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-sans",
});

export const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-mono",
});
