import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { inter, jetbrainsMono, spaceGrotesk } from "./fonts";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { chartreuse } from "@/styles/tokens";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amperity.com"),
  title: {
    default: "Amperity: The Customer Context Platform",
    template: "%s | Amperity",
  },
  description:
    "Amperity resolves fragmented customer data into trusted, real-time context, so every team and every AI agent acts on the same truth.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: chartreuse,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <body>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-chartreuse focus:px-6 focus:py-2 focus:text-body-sm focus:font-medium focus:text-black"
          >
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
