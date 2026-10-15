import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "WedLockStudio | Professional Video Editing Agency",
  description: "Capture your moments with WedLockStudio. Professional video editing services.",
  openGraph: {
    title: "WedLockStudio | Professional Video Editing Agency",
    description: "Capture your moments with WedLockStudio. Professional video editing services.",
    type: "website",
    siteName: "WedLockStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "WedLockStudio | Professional Video Editing Agency",
    description: "Capture your moments with WedLockStudio. Professional video editing services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-[#fbfbf8] text-black antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
