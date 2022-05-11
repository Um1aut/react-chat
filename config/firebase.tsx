import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDlqo3ZIYkt58yrQXRaTfBBW_0dwMgl3LU",
    authDomain: "reactwebsite-fe1fa.firebaseapp.com",
    projectId: "reactwebsite-fe1fa",
    storageBucket: "reactwebsite-fe1fa.appspot.com",
    messagingSenderId: "839103744459",
    appId: "1:839103744459:web:3c09ad2da7bc69c3f4ce4e",
    measurementId: "G-WZ5HKS6WDJ"
  };

  const app = initializeApp(firebaseConfig)
  export const auth = getAuth()

