"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/monitor/sidebar";  // Import Sidebar here

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current path starts with '/monitor'
  const isMonitorPage = pathname.startsWith("/monitor");

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Securion Sphere - Penetration Testing Learning Platform"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>Securion Sphere</title>
      </head>
      <body
        className={`flex flex-col bg-gray-100 min-h-screen ${inter.className}`}
      >
        <AuthProvider>
          {!pathname.includes("/auth") && <Navbar />}
          <div className="flex flex-1">
            {/* Conditionally render Sidebar only on /monitor path */}
            {isMonitorPage && <Sidebar />}
            <main className="flex-grow p-8">{children}</main>
          </div>
          {!pathname.includes("/auth") && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
