import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Config } from "@/config";
import { getBaseURL } from "@/utils";
import LayoutProvider from "@/components/layout-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = await getBaseURL();

  return {
    metadataBase: new URL(BASE_URL),
    title: Config.fullTitle,
    description: Config.description,
    openGraph: {
      images: [
        {
          url: new URL("/home.jpg", BASE_URL),
          width: 800,
          height: 600,
          alt: Config.title,
        },
        {
          url: new URL("/home.jpg", BASE_URL),
          width: 1200,
          height: 900,
          alt: Config.title,
        },
        {
          url: new URL("/home.jpg", BASE_URL),
          width: 1920,
          height: 1440,
          alt: Config.title,
        },
        {
          url: new URL("/home.jpg", BASE_URL),
          width: 4000,
          height: 3000,
          alt: Config.title,
        },
      ],
    },
    keywords: Config.keywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
