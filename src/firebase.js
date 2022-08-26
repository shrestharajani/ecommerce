// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANW46oGhvETM9AEAZfKfPVYepVc_g7Zuc",
  authDomain: "e-commerce-41570.firebaseapp.com",
  databaseURL: "https://e-commerce-41570-default-rtdb.firebaseio.com",
  projectId: "e-commerce-41570",
  storageBucket: "e-commerce-41570.appspot.com",
  messagingSenderId: "778363496846",
  appId: "1:778363496846:web:7a188bc0893d7db1ae1cdf",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore_db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider(auth, app);

//export
export { app, firestore_db, storage, auth, googleAuthProvider };
