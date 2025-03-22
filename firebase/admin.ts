import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  try {
    const apps = getApps();

    if (!apps.length) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY 
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") 
        : undefined;
        
      if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        console.error("Firebase Admin SDK credentials missing in environment variables");
        throw new Error("Firebase Admin SDK initialization failed - missing credentials");
      }
      
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
    }

    return {
      auth: getAuth(),
      db: getFirestore(),
    };
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
    throw error;
  }
}

export const { auth, db } = initFirebaseAdmin();
