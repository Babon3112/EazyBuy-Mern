// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjcBDWZbb3OkVkkBxUG5PigPqrr_mUDe4",
  authDomain: "eazybuy3112.firebaseapp.com",
  projectId: "eazybuy3112",
  storageBucket: "eazybuy3112.appspot.com",
  messagingSenderId: "243098668129",
  appId: "1:243098668129:web:6806c744ec025e88afae20",
  measurementId: "G-5ER12K9R8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;