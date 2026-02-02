import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const sora = Sora({ subsets: ["latin"] });

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
      <body className={`${sora.className} bg-white text-black antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
