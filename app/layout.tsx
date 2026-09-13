import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "WedLockStudio | Professional Video Editing Agency",
  description: "Capture your moments with WedLockStudio. Professional video editing services.",
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
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
