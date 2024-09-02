import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "github-markdown-css";
import { Header } from "./_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Divasatanica SilverWing",
  description: "Hello divasatanica's magic world",
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
        <main className="p-4 pt-[92px] sm:p-8 sm:pt-[92px] md:p-16 md:pt-[92px] lg:p-24 lg:pt-[92px] pb-4 ">
          <div style={{ maxWidth: 1254, margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
