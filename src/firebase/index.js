import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
firebase.initializeApp({
  apiKey: "AIzaSyCrGNNLmICL-qxEnKW7q4dOS6uEW2VywjU",
  authDomain: "chatapp-50cf9.firebaseapp.com",
  databaseURL: "https://chatapp-50cf9.firebaseio.com",
  projectId: "chatapp-50cf9",
  storageBucket: "chatapp-50cf9.appspot.com",
  messagingSenderId: "543206785165",
  appId: "1:543206785165:web:9e6e7fea52164e28e6a2c4",
  measurementId: "G-EK3E5MT298",
});
const db = firebase.firestore();
const auth = firebase.auth;
export { db, auth };
