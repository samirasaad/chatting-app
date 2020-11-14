import React, { useState } from "react";
import { db, auth } from "./../../firebase";
import { signin, signInWithGoogle } from "./../../firebase/authMethods";
import History from "./../../routes/History";
function Login() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const addUserInfoToStorage = () => {
    localStorage.setItem("isAuthnticated", true);
    localStorage.setItem("userID", auth().currentUser.uid);
    localStorage.setItem("userPic", auth().currentUser.photoURL);
    localStorage.setItem("userFullName", auth().currentUser.displayName);
    localStorage.setItem("userEmail", auth().currentUser.email);
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
      let usersList = [];
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
      addUserInfoToStorage();
      let user = auth().currentUser;
      await db
        .collection("users")
        .where("id", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          usersList = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
        });
      if (usersList.length === 0) {
        //new user set it to users collection
        db.collection("users").doc(user.uid).set({
          id: user.uid,
          userName: user.displayName,
          photoUrl: user.photoURL,
          userEmail: user.email,
        });
      } else {
        //already existing user
        addUserInfoToStorage();
      }
      History.push("/Chat");
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
