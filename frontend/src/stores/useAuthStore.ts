
import { persist, createJSONStorage  } from "zustand/middleware";
import { create  } from "zustand";
import { jwtDecode } from "jwt-decode";
import type { UserProfile } from "../types/auth.types";

interface AuthState{
    isAuthenticated : boolean;
    user : UserProfile | null
    role: string | null;
    token: string | null;
    login: (user: UserProfile, token: string, role?: string) => void;
    logout : () => void;
    isTokenValid: () => boolean;
}

    

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            role: null,
            token: null,
            isAuthenticated: false,
            login: (user, token, role = "guest") => set({
                user,
                token,
                role,
                isAuthenticated: true,
            }),
            logout: () => {
                set({ user: null, role: null, token: null, isAuthenticated: false });
                sessionStorage.removeItem("auth-storage");
            },
            isTokenValid: () => {
                const token = get().token;
                if (!token) return false;
                try {
                    const decoded = jwtDecode<{ exp: number }>(token);
                    return decoded.exp * 1000 > Date.now();
                } catch {
                    return false;
                }
            },
        }),
        {
          name: "auth-storage", 
          storage: createJSONStorage(() => sessionStorage),
        }
      )
);