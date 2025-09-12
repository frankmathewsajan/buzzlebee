import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6fpKX_08M19l_RXMUVzWk42CL2qVqKKc",
  authDomain: "itsfrank.firebaseapp.com",
  projectId: "itsfrank",
  storageBucket: "itsfrank.firebasestorage.app",
  messagingSenderId: "966265540510",
  appId: "1:966265540510:web:b6a9697d05cdaa3ecb108f",
  measurementId: "G-BSCTBEECZ4"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };