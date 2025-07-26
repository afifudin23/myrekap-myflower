// src/stores/useAuthStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { axiosInstance } from "@/utils";

interface AuthState {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
    verifyToken: () => Promise<void>;
    setUser: (user: any) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            loading: true,

            setUser: (user: any) => {
                localStorage.setItem("user", JSON.stringify(user));
                set({ user, isAuthenticated: true });
            },

            verifyToken: async () => {
                set({ loading: true });
                const user = localStorage.getItem("user");

                if (!user) {
                    await axiosInstance.post("/auth/logout");
                    localStorage.clear();
                    set({ user: null, isAuthenticated: false, loading: false });
                    return;
                }

                try {
                    await axiosInstance.get("/auth/verify"); // token valid
                    set({ user, isAuthenticated: true });
                } catch (err) {
                    console.error("🔒 Token invalid:", err);
                    localStorage.clear();
                    set({ user: null, isAuthenticated: false });
                } finally {
                    set({ loading: false });
                }
            },

            logout: async () => {
                try {
                    await axiosInstance.post("/auth/logout");
                } catch (err) {
                    console.warn("Logout error (ignored):", err);
                } finally {
                    localStorage.clear();
                    set({ user: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: "auth-storage", // untuk localStorage key
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
