// firebase.ts

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpoR-xUeCPIqLsAqXWChKjcZivFwoAxzg",
  authDomain: "netlfix-clone-8fceb.firebaseapp.com",
  projectId: "netlfix-clone-8fceb",
  storageBucket: "netlfix-clone-8fceb.appspot.com",
  messagingSenderId: "976837160825",
  appId: "1:976837160825:web:5540c37699d0d6a3f449a8",
  measurementId: "G-KHQJSN8F6Q"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
