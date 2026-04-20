import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIRAVAT | AI Image Generation Platform",
  description: "Create stunning AI images with your own vision using Gemini AI APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-white text-gray-900 antialiased overflow-x-hidden relative`}>
        <Navbar />
        <main className="min-h-[100dvh] pt-24 md:pt-32 pb-20 md:pb-0 relative z-0">
          {children}
        </main>
        <Footer />
        <div className="relative z-[99999]">
          <MobileNav />
          <WhatsAppButton />
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  );
}
