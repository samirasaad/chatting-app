import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import "firebase/storage";
firebase.initializeApp({
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});
const db = firebase.firestore();
const auth = firebase.auth;
const storage = firebase.storage();
export { db, auth, storage };
