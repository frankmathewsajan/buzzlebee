"use client";

import { useState, useEffect } from "react";
import { Caveat, Outfit } from "next/font/google";
import "./globals.css";
import MobileMessage from "./components/MobileMessage";
import Analytics from "./components/Analytics";

// Initialize Firebase Analytics
import "../lib/firebase";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <html lang="en" className={`${caveat.variable} ${outfit.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <Analytics />
        {isMobile ? <MobileMessage /> : children}
      </body>
    </html>
  );
}
