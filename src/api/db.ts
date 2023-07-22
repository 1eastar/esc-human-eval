// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsR1fp2PdaB2LltIeIxpMO_LbmTK15p0",
  authDomain: "es-dli.firebaseapp.com",
  projectId: "es-dli",
  storageBucket: "es-dli.appspot.com",
  messagingSenderId: "817616439334",
  appId: "1:817616439334:web:004453f83910eed3453ee7"
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
