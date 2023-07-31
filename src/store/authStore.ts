import firebase from "firebase/compat/app";
import { create } from "zustand";

interface AuthStore {
  user: firebase.User | null;
  setUser: (user: firebase.User) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: firebase.User | null) => set({ user }),
}));

export default useAuthStore;
