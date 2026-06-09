import { getApp, getApps, initializeApp } from "firebase/app"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"

const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "true"

const firebaseConfig = useEmulator
  ? {
      apiKey: "demo-api-key",
      authDomain: "demo-project.firebaseapp.com",
      projectId: "demo-project",
      storageBucket: "demo-project.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef",
    }
  : {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

const app = getApps().length < 1 ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

if (useEmulator && typeof window !== "undefined") {
  const globalWithFlag = globalThis as typeof globalThis & {
    __FIRESTORE_EMULATOR_CONNECTED__?: boolean
  }

  if (!globalWithFlag.__FIRESTORE_EMULATOR_CONNECTED__) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080)
    globalWithFlag.__FIRESTORE_EMULATOR_CONNECTED__ = true
  }
}

export { db }
