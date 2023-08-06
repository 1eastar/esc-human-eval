// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-fhg6bSQ76vf31SEeVrnyLWFf3XyQhbw",
  authDomain: "mr-dli.firebaseapp.com",
  projectId: "mr-dli",
  storageBucket: "mr-dli.appspot.com",
  messagingSenderId: "757446308702",
  appId: "1:757446308702:web:18a23b58904b012044d5cf"
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
