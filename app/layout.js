import { Caveat, Outfit } from 'next/font/google';
import './globals.css';

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat'
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit'
});

export const metadata = {
  title: 'Frank Mathew Sajan - Portfolio',
  description: 'Software Developer & Problem Solver',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${caveat.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
