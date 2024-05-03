import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiCHxe7kbeeBdYCDttOXLwf8cb4CE4srM",
  authDomain: "student-management-bd681.firebaseapp.com",
  projectId: "student-management-bd681",
  storageBucket: "student-management-bd681.appspot.com",
  messagingSenderId: "368605286854",
  appId: "1:368605286854:web:e0074803bc2f1c3d7e22c7",
  measurementId: "G-WC8T3TJ7NE"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
