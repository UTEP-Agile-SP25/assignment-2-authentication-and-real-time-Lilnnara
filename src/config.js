// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkT1B1exuv6aBfUkX834P5fng8ksXQ7tY",
  authDomain: "macias-sandbo.firebaseapp.com",
  projectId: "macias-sandbo",
  storageBucket: "macias-sandbo.firebasestorage.app",
  messagingSenderId: "477530006001",
  appId: "1:477530006001:web:bb80f3a4c80d49bb0fa450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);
export default app;