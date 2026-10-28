import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const displayFont = localFont({
  src: "../../public/fonts/grenze-gotisch-latin-700-normal.woff2",
  variable: "--font-gothic",
  weight: "700",
  display: "swap",
});
const serifFont = localFont({
  src: [
    {
      path: "../../public/fonts/eb-garamond-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/eb-garamond-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/eb-garamond-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-garamond",
  display: "swap",
});
const monoFont = localFont({
  src: "../../public/fonts/jetbrains-mono-latin-400-normal.woff2",
  variable: "--font-label",
  weight: "400",
  display: "swap",
});
const handwritingFont = localFont({
  src: "../../public/fonts/homemade-apple-latin-400-normal.woff2",
  variable: "--font-handwriting",
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Vishwanath Nishad — Full Stack Developer Portfolio",
  description:
    "Portfolio of Vishwanath Nishad — Full Stack Developer specializing in Software Development, Backend, and modern web applications.",
  openGraph: {
    title: "Vishwanath Nishad — Full Stack Developer Portfolio",
    description:
      "Portfolio of Vishwanath Nishad — Full Stack Developer specializing in Software Development, Backend, and modern web applications.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=20261028", type: "image/svg+xml" },
      { url: "/icon?v=20261028", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon?v=20261028", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${serifFont.variable} ${monoFont.variable} ${handwritingFont.variable} scroll-smooth dark`}
    >
      <head>
        <script
          id="intro-session"
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('portfolio-intro-seen')==='1')document.documentElement.dataset.introSkip='true'}catch{}`,
          }}
        />
      </head>
      <body className="bg-bg text-text-primary antialiased font-body">
        <noscript>
          <style>{`.monogram-preloader{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
