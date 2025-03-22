"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

interface FirebaseAuthError extends Error {
  code?: string;
  message: string;
}

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = await cookies();

    // Verify the token before creating a session
    await auth.verifyIdToken(idToken);
    
    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });

    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (error: unknown) {
    console.error("Error setting session cookie:", error);
    const firebaseError = error as FirebaseAuthError;
    if (firebaseError.code === "auth/invalid-id-token" || firebaseError.code === "auth/invalid-credential") {
      throw new Error("Invalid authentication token. Please sign in again.");
    }
    throw error;
  }
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
      // profileURL,
      // resumeURL,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    const firebaseError = error as FirebaseAuthError;

    // Handle Firebase specific errors
    if (firebaseError.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    try {
      await setSessionCookie(idToken);
    } catch (sessionError: unknown) {
      console.error("Session cookie error:", sessionError);
      const firebaseError = sessionError as FirebaseAuthError;
      return {
        success: false,
        message: firebaseError.code === "auth/invalid-credential" 
          ? "Invalid credentials. Please sign in again." 
          : "Failed to create session. Please try again.",
      };
    }
  } catch (error: unknown) {
    console.error("Authentication error:", error);
    const firebaseError = error as FirebaseAuthError;
    return {
      success: false,
      message: firebaseError.code === "auth/invalid-credential" 
        ? "Invalid credentials. Please try again." 
        : "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error: unknown) {
    console.error("Session verification error:", error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
