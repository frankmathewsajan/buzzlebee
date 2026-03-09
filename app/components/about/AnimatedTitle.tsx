"use client";

import { useEffect, useState } from "react";

const DECODE_SEQUENCE = [
  "Kapitel Eins: Einführung",
  "K@p1t3l E1ns: E1nführung",
  "Kap1tel 31ns: 31nführung",
  "Chapt3l 0ne: 1ntroduct10n",
  "Chapt3r 0ne: 1ntr0duct10n",
  "Chap7er On3: Intr0ducti0n",
  "Chapter 0ne: Introduct1on",
  "Chapter On3: Introduction",
  "Chapter One: Intro@uction",
  "Chapter One: Introduction",
];

export default function AnimatedTitle() {
  const [titleText, setTitleText] = useState(DECODE_SEQUENCE[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < DECODE_SEQUENCE.length - 1) {
          index++;
          setTitleText(DECODE_SEQUENCE[index]);
        } else {
          clearInterval(interval);
        }
      }, 200);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl font-serif font-light bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-8 px-4 animate-entry-scale-in">
      {titleText}
    </h1>
  );
}
