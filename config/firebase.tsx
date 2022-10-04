import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCebLKIfnL8Okj0cwPJ2VvuWfexRllynoo",
  authDomain: "react-chat-d6887.firebaseapp.com",
  projectId: "react-chat-d6887",
  storageBucket: "react-chat-d6887.appspot.com",
  messagingSenderId: "48891537671",
  appId: "1:48891537671:web:809b2944eed2c61fcfbda2",
  measurementId: "G-6YMHEGG5F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  export const auth = getAuth()
  export const db = getFirestore(app);
