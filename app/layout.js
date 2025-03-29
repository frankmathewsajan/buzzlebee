"use client";

import { useState, useEffect } from "react";
import { Caveat, Outfit } from "next/font/google";
import "./globals.css";
import MobileMessage from "./components/MobileMessage";

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
      <body>{isMobile ? <MobileMessage /> : children}</body>
    </html>
  );
}
