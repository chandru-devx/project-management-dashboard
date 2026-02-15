// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM-pW6DOT2Hq54La79cb5rwqvUAducMa4",
  authDomain: "admin-dashboard-3ed57.firebaseapp.com",
  projectId: "admin-dashboard-3ed57",
  storageBucket: "admin-dashboard-3ed57.firebasestorage.app",
  messagingSenderId: "211524492016",
  appId: "1:211524492016:web:4c7654620229a7b2334035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

