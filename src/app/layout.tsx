import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishwanath Nishad — Full Stack Developer Portfolio",
  description:
    "Portfolio of Vishwanath Nishad — Full Stack Developer specializing in Software Development, Backend, and modern web applications.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="bg-bg text-text-primary antialiased font-body">
        {children}
      </body>
    </html>
  );
}
