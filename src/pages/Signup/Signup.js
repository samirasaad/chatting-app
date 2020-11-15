import React, { useState } from "react";
import { db, auth } from "./../../firebase";
import { signup } from "./../../firebase/authMethods";
import History from "./../../routes/History";
function Signup() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "userName":
        setUserName(e.target.value);
        break;
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

  const addUserInfoToStorage = () => {
    console.log(auth().currentUser);
    localStorage.setItem("isAuthnticated", true);
    localStorage.setItem("userID", auth().currentUser.uid);
    // localStorage.setItem("userPic", auth().currentUser.photoURL);
    // localStorage.setItem("userFullName", auth().currentUser.displayName);
    // localStorage.setItem("userEmail", auth().currentUser.email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let usersList = [];
      await signup(email, password);
      //we can check if there`s a currentuser rather than using onAuthStateChanged
      auth().onAuthStateChanged(async function (user) {
        if (user) {
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
            //if new user set it to users collection
            db.collection("users")
              .doc(user.uid)
              .set({
                id: user.uid,
                userName: user.displayName || userName,
                photoUrl: user.photoURL,
                userEmail: user.email,
                availibility: "online",
              });
            addUserInfoToStorage();
          } else {
            //already existing user
            addUserInfoToStorage();
            db.collection("users").doc(user.uid).update({
              availibility: "online",
            });
          }
          History.push("/Chat/index");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <span>signup page</span>
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={handleChange}
      />
      <input type="email" name="email" value={email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        signup
      </button>
    </>
  );
}

export default Signup;
