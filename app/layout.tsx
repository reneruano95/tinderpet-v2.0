import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "@/components/providers.tsx/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinderPet",
  description: "App for pet lovers to connect with each other",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {children}</Providers>
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
