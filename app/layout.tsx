import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBEROPS - Hacker Dashboard",
  description: "Immersive hacker-style dashboard interface",
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
