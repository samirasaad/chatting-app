import { auth } from "./";
function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
  }

export { signup, signin, signInWithGoogle };
