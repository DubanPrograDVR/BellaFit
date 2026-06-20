'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { getCurrentUser, onAuthChange, loginUser, registerUser, logoutUser } from '../services/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, displayName: string, phoneNumber?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Subscribe to auth changes on mount
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setState({
        user,
        loading: false,
        error: null,
      });
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const result = await loginUser(email, password);

    if (!result.success) {
      setState((prev) => ({ ...prev, loading: false, error: result.error }));
    }

    return result;
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName: string, phoneNumber?: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const result = await registerUser(email, password, displayName, phoneNumber);

      if (!result.success) {
        setState((prev) => ({ ...prev, loading: false, error: result.error }));
      }

      return result;
    },
    []
  );

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const result = await logoutUser();

    if (!result.success) {
      setState((prev) => ({ ...prev, loading: false, error: result.error }));
    } else {
      setState({ user: null, loading: false, error: null });
    }
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
  };
}
