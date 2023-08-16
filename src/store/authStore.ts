import { create } from "zustand";
// import firebase from "firebase/app";
import "firebase/auth";
import firebase from "firebase/compat/app";

interface AuthStore {
  user: firebase.UserInfo | null;
  setUser: (user: firebase.UserInfo | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: firebase.UserInfo | null) => set({ user }),
}));

export default useAuthStore;
