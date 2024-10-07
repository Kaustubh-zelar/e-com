// pages/api/firebase.js
'use client';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8SSPyAWxcTJUnnIJu-wj_xmPvbZZJbyA",
  authDomain: "newcom-4a715.firebaseapp.com",
  projectId: "newcom-4a715",
  storageBucket: "newcom-4a715.appspot.com",
  messagingSenderId: "414888589884",
  appId: "1:414888589884:web:a5b21323d396679eb06139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db };
