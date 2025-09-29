"use client";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/provider/nextProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
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
