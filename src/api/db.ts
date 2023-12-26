// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb6mnA4FeFXewXUKVCkV1odJfXFX6cv4Q",
  authDomain: "esc-dli.firebaseapp.com",
  projectId: "esc-dli",
  storageBucket: "esc-dli.appspot.com",
  messagingSenderId: "217768356450",
  appId: "1:217768356450:web:bada364b59bac15e677f3b"
}

// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: ""
// }

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const db = getFirestore(app)
// console.log(db)
