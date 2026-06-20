'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getUserProfile, updateUserProfile, UserProfile } from '../services/firestore';

interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
}

export function useUserProfile(): UseUserProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile when user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const result = await getUserProfile(user.uid);

      if (result.success) {
        setProfile(result.user ?? null);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      setLoading(true);
      setError(null);
      const result = await updateUserProfile(user.uid, updates);

      if (result.success) {
        setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      } else {
        setError(result.error);
      }

      setLoading(false);
      return result;
    },
    [user]
  );

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}
