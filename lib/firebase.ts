import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Next.js only injects env vars for static property accesses like process.env.MY_KEY.
// Avoid dynamic lookups; validate required vars with static references.
const env = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const missing = Object.entries(env)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length > 0) {
  throw new Error(
    `Missing required env var(s): ${missing.join(", ")}. Add them to your .env.local (or hosting env).`,
  );
}

const firebaseConfig = {
  apiKey: env.apiKey as string,
  authDomain: env.authDomain as string,
  projectId: env.projectId as string,
  storageBucket: env.storageBucket as string,
  messagingSenderId: env.messagingSenderId as string,
  appId: env.appId as string,
  measurementId: env.measurementId as string,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };