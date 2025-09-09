import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  email: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setAccessToken: (token: string) => void;
  setEmail: (email: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      email: null,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setAccessToken: (token: string) =>
        set({ accessToken: token, isLoggedIn: !!token }),
      setEmail: (email: string) => set({ email }),
      clearAuth: () =>
        set({ isLoggedIn: false, accessToken: null, email: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
