import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1kYhdOOJKpGC1gkOWsoum7LsXb_aAS44",
  authDomain: "planleges.firebaseapp.com",
  projectId: "planleges",
  storageBucket: "planleges.appspot.com",
  messagingSenderId: "712248973843",
  appId: "1:712248973843:web:66b1b3ddf926268118bde6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()
const rtdb = getDatabase();

export { auth, db, rtdb }