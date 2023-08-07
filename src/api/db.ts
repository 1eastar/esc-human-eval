// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgZsTwnjJ6Brr1OzqGSqicNVW5IGdgWgc",
  authDomain: "mr2-dli.firebaseapp.com",
  projectId: "mr2-dli",
  storageBucket: "mr2-dli.appspot.com",
  messagingSenderId: "54832589088",
  appId: "1:54832589088:web:dcd989e584b49222b1cf45"
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
