
import { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthData {
  user?: IUser | null;
  token?: string | null;
}

interface AuthState extends AuthData {
  setAuth: (payload: AuthData) => void;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (payload: AuthData) => set(payload),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);



export default useAuth;