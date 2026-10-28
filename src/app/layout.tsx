import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const displayFont = localFont({
  src: "../../public/fonts/anton-latin-400-normal.woff2",
  variable: "--font-anton",
  display: "swap",
});
const serifFont = localFont({
  src: [
    {
      path: "../../public/fonts/instrument-serif-latin-400-normal.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/instrument-serif-latin-400-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
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
      className={`${displayFont.variable} ${serifFont.variable} scroll-smooth dark`}
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
