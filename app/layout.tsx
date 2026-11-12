import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.jpg`;

  return {
    title: "与航 - 向前看",
    description: "顺路的话，我们看一样的风景。不顺路的话，祝我们都能看到自己想要的风景。",
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg?v=2", type: "image/svg+xml" },
        { url: "/icon-32.png?v=2", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg?v=2", color: "#ff6241" }],
    },
    openGraph: {
      title: "与航 - 向前看",
      description: "顺路的话，我们看一样的风景。",
      type: "website",
      locale: "zh_CN",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "与航" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "与航 - 向前看",
      description: "顺路的话，我们看一样的风景。",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#131312" },
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
