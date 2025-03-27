import { Lora, Playfair_Display } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Note: Agindar is not available in Google Fonts, so we'll need to use a different approach
// You might want to use a different font or host Agindar locally
export const agindar = {
  variable: '--font-agindar',
  style: {
    fontFamily: 'Agindar, cursive',
  },
}; 