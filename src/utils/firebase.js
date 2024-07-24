// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAMZmwCez4oMD_Js9nxcC5_oR47InlDHM",
  authDomain: "netflixgpt-b2336.firebaseapp.com",
  projectId: "netflixgpt-b2336",
  storageBucket: "netflixgpt-b2336.appspot.com",
  messagingSenderId: "386789874807",
  appId: "1:386789874807:web:19bf23ebea88e7e2befa72",
  measurementId: "G-068VGEM6E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

export const auth = getAuth();