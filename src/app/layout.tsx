import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "My Portfolio",
    description: "My Portfolio Website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
