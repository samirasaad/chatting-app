import { auth } from "./";
import History from "./../routes/History";

function signup(email, password) {
  return auth()
    .createUserWithEmailAndPassword(email, password)
}

function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

const firebaseSignout = () => {
  auth()
    .signOut()
    .then((res) => {
      localStorage.clear();
      History.push("/Login");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export { signup, signin, signInWithGoogle, firebaseSignout };
