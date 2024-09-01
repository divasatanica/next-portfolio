import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "github-markdown-css";
import { Header } from "./_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ludwig Zeng's profile",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights />
        <Analytics />
        <Header />
        <main className="p-24 pt-[92px] pb-4">
          <div style={{ maxWidth: 1254, margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
