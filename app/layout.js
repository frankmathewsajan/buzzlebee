import { Lora, Playfair_Display } from 'next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Frank Mathew Sajan - Portfolio',
  description: 'Software Developer & Problem Solver',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.className} ${playfair.className}`}>
      <body>{children}</body>
    </html>
  );
}
