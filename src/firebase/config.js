// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT7SsWV0FBYpz3qQuP0ClsWM89HSOdLgM",
  authDomain: "react-cursos-8a766.firebaseapp.com",
  projectId: "react-cursos-8a766",
  storageBucket: "react-cursos-8a766.appspot.com",
  messagingSenderId: "696174745050",
  appId: "1:696174745050:web:8eaef94eef1e41f8715ce3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp )