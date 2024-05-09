// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5vQPiT9dCt1IorLdNkqiCnCYqPShbdJw",
  authDomain: "netflixgpt-11358.firebaseapp.com",
  projectId: "netflixgpt-11358",
  storageBucket: "netflixgpt-11358.appspot.com",
  messagingSenderId: "304890577534",
  appId: "1:304890577534:web:a9a16c4c6cd4608732ce2f",
  measurementId: "G-12HJPPCX80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();