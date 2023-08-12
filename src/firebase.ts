/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUzSpiDmOAyf4uKCWLJ0rsQ9ix9Ap4fAE",
  authDomain: "e-comm-primary.firebaseapp.com",
  projectId: "e-comm-primary",
  storageBucket: "e-comm-primary.appspot.com",
  messagingSenderId: "742273897704",
  appId: "1:742273897704:web:b44f3cc24c2e8815a5255d",
  databaseURL: "https://e-comm-primary-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
