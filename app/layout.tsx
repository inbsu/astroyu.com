import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.jpg`;

  return {
    title: "与航 — 向前看",
    description: "顺路的话，我们看一样的风景。不顺路的话，祝我们都能看到自己想要的风景。",
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title: "与航 — 向前看",
      description: "顺路的话，我们看一样的风景。",
      type: "website",
      locale: "zh_CN",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "与航" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "与航 — 向前看",
      description: "顺路的话，我们看一样的风景。",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
