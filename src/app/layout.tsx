import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Vishwanath Nishad — Full Stack Developer",
    description:
        "Portfolio of Vishwanath Nishad — Full Stack Developer specializing in MERN stack, React Native, and modern web applications.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="antialiased">
                {children}
                <Analytics />
            </body>
        </html>
    );
}
