import firebase from "firebase";
import "firebase/app";
firebase.initializeApp({
    apiKey: "AIzaSyB4NuN-o0lts90NZy5rjdWgVuqnfMHu6y8",
    authDomain: "react-firebase-1fff8.firebaseapp.com",
    databaseURL: "https://react-firebase-1fff8.firebaseio.com",
    projectId: "react-firebase-1fff8",
    storageBucket: "react-firebase-1fff8.appspot.com",
    messagingSenderId: "1065420981264",
    appId: "1:1065420981264:web:0242d5f26c680a71183695",
    measurementId: "G-TL7BBT8HN0"
  });
const db = firebase.firestore();
export default db;
