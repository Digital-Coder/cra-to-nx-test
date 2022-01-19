// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// change dummy firebase keys to a real db from senf.
const firebaseConfig = {
  /*  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  dabaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID, */

  apiKey: "AIzaSyBNbqD70Fs1RLOt_7LDch9_IB8bKiuh63k",

  authDomain: "smiling-foundry-254822.firebaseapp.com",

  projectId: "smiling-foundry-254822",

  storageBucket: "smiling-foundry-254822.appspot.com",

  messagingSenderId: "788864565485",

  appId: "1:788864565485:web:91b32eff27c6c80cb40ce4",

  measurementId: "G-Z535E81YJD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
