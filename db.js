// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoo7BwMV5IxVC23l4Dd_HO6Ythjcde1Pk",
  authDomain: "proyecto-final-manuel.firebaseapp.com",
  projectId: "proyecto-final-manuel",
  storageBucket: "proyecto-final-manuel.firebasestorage.app",
  messagingSenderId: "927129875790",
  appId: "1:927129875790:web:5b723c1f781cf7c41bda1f",
//   measurementId: "G-PMWEG69HQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);


export default db;