import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../firebase';

// User types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  role: 'user' | 'instructor' | 'admin';
  profileImage?: string;
  bio?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  amount: number;
  quantity: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ClassEnrollment {
  id: string;
  userId: string;
  classId: string;
  className: string;
  instructorId: string;
  status: 'active' | 'completed' | 'cancelled';
  enrolledAt: Timestamp;
  completedAt?: Timestamp;
}

// Create/Update user profile
export async function createUserProfile(uid: string, userData: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', uid);
    const profileData: UserProfile = {
      uid,
      email: userData.email || '',
      displayName: userData.displayName || '',
      phoneNumber: userData.phoneNumber,
      role: userData.role || 'user',
      profileImage: userData.profileImage,
      bio: userData.bio,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await setDoc(userRef, profileData);
    return { success: true, user: profileData };
  } catch (error: any) {
    console.error('[Firestore] Error creating user profile:', error);
    return { success: false, error: error.message };
  }
}

// Get user profile
export async function getUserProfile(uid: string) {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: true, user: userSnap.data() as UserProfile };
    } else {
      return { success: false, error: 'Usuario no encontrado' };
    }
  } catch (error: any) {
    console.error('[Firestore] Error getting user profile:', error);
    return { success: false, error: error.message };
  }
}

// Update user profile
export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error: any) {
    console.error('[Firestore] Error updating user profile:', error);
    return { success: false, error: error.message };
  }
}

// Create purchase
export async function createPurchase(purchase: Omit<Purchase, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const purchasesRef = collection(db, 'purchases');
    const docRef = await addDoc(purchasesRef, {
      ...purchase,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { success: true, purchaseId: docRef.id };
  } catch (error: any) {
    console.error('[Firestore] Error creating purchase:', error);
    return { success: false, error: error.message };
  }
}

// Get user purchases
export async function getUserPurchases(userId: string) {
  try {
    const purchasesRef = collection(db, 'purchases');
    const q = query(purchasesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const purchases: Purchase[] = [];
    querySnapshot.forEach((doc) => {
      purchases.push({ id: doc.id, ...doc.data() } as Purchase);
    });

    return { success: true, purchases };
  } catch (error: any) {
    console.error('[Firestore] Error getting purchases:', error);
    return { success: false, error: error.message };
  }
}

// Enroll in class
export async function enrollInClass(enrollment: Omit<ClassEnrollment, 'id' | 'enrolledAt'>) {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const docRef = await addDoc(enrollmentsRef, {
      ...enrollment,
      enrolledAt: Timestamp.now(),
    });

    return { success: true, enrollmentId: docRef.id };
  } catch (error: any) {
    console.error('[Firestore] Error enrolling in class:', error);
    return { success: false, error: error.message };
  }
}

// Get user enrollments
export async function getUserEnrollments(userId: string) {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const q = query(enrollmentsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const enrollments: ClassEnrollment[] = [];
    querySnapshot.forEach((doc) => {
      enrollments.push({ id: doc.id, ...doc.data() } as ClassEnrollment);
    });

    return { success: true, enrollments };
  } catch (error: any) {
    console.error('[Firestore] Error getting enrollments:', error);
    return { success: false, error: error.message };
  }
}
