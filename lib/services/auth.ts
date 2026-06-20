import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

// Register
export async function registerUser(
  email: string,
  password: string,
  displayName: string,
  phoneNumber?: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, {
      displayName,
      photoURL: null,
    });

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al registrar usuario',
    };
  }
}

// Login
export async function loginUser(email: string, password: string) {
  try {
    // Ensure persistence is set to local storage
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al iniciar sesión',
    };
  }
}

// Logout
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al cerrar sesión',
    };
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Subscribe to auth changes
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
