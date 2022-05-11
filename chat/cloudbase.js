import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDlqo3ZIYkt58yrQXRaTfBBW_0dwMgl3LU",
    authDomain: "reactwebsite-fe1fa.firebaseapp.com",
    databaseURL: "https://reactwebsite-fe1fa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reactwebsite-fe1fa",
    storageBucket: "reactwebsite-fe1fa.appspot.com",
    messagingSenderId: "839103744459",
    appId: "1:839103744459:web:3c09ad2da7bc69c3f4ce4e",
    measurementId: "G-WZ5HKS6WDJ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
