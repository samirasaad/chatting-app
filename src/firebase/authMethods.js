import { auth } from "./";
function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export { signup, signin };
