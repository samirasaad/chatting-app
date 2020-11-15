import React, { useState } from "react";
import { db, auth } from "./../../firebase";
import { signin, signInWithGoogle } from "./../../firebase/authMethods";
import History from "./../../routes/History";
function Login() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const addUserInfoToStorage = () => {
    localStorage.setItem("isAuthnticated", true);
    // localStorage.setItem("userID", auth().currentUser.uid);
    // localStorage.setItem("userPic", auth().currentUser.photoURL);
    // localStorage.setItem("userFullName", auth().currentUser.displayName);
    // localStorage.setItem("userEmail", auth().currentUser.email);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEamil(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        setEamil("");
        setPassword("");
    }
  };

  const handleSubmit = async (e, signInType) => {
    e.preventDefault();
    try {
      switch (signInType) {
        case "emailAndPassowrd":
          await signin(email, password);
          break;
        case "google":
          await signInWithGoogle(email, password);
          break;
        default:
          return;
      }
      auth().onAuthStateChanged(async function (user) {
        if (user) {
          addUserInfoToStorage();
          db.collection("users").doc(user.uid).update({
            availibility: "online",
          });
          History.push("/Chat/index");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <span>login page</span>
      <input type="email" name="email" value={email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e, "emailAndPassowrd")}
      >
        login
      </button>
      <span>or</span>
      <button type="button" onClick={(e) => handleSubmit(e, "google")}>
        sign in with google
      </button>
    </>
  );
}

export default Login;
