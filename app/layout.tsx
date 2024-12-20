"use client";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/provider/nextProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <NextAuthProvider>
            <div>
              <Navbar />
            </div>
            <section className="grow bg-slate-950 h-dvh">{children}</section>
          </NextAuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
