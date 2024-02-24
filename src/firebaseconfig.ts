import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBc227tZpUTZRpmI_GnTXZEgCW6BmEdBHI",
    authDomain: "project-box-f054a.firebaseapp.com",
    databaseURL: "https://project-box-f054a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "project-box-f054a",
    storageBucket: "project-box-f054a.appspot.com",
    messagingSenderId: "568814575445",
    appId: "1:568814575445:web:1a22f29c9c9179fb5f99dc",
    measurementId: "G-1DZY4JD8YM"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Connect to Firestore Emulator in development environment only
if (location.hostname === '127.0.0.1') {
    // Assuming your Firestore emulator is running on the default port
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }

export { db };
