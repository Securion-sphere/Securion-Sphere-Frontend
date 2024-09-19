"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import LoadingPage from "@/components/loading/LoadingPage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarAndFooter = pathname === "/auth/login";

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>Securion Sphere</title>
      </Head>
      <body
        className={`flex flex-col bg-gray-100 min-h-screen ${inter.className}`}
      >
        <AuthProvider>
          {!hideNavbarAndFooter && <NavBar />}
          <div className="flex-grow h-full">
            <Suspense fallback={<LoadingPage />}>{children}</Suspense>
          </div>
          {!hideNavbarAndFooter && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
