import React, { useEffect, useState } from "react";
import UploadFile from "../../components/UploadFile/UploadFile";
import { db, auth, storage } from "./../../firebase";
import { signup } from "./../../firebase/authMethods";
import History from "./../../routes/History";
function Signup() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadedUrl, setDownloadedUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (downloadedUrl) {
      let usersList = [];
      db.collection("users")
        .where("id", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          usersList = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
        });
      if (usersList.length === 0) {
        //if new user set it to users collection
        db.collection("users")
          .doc(currentUser.uid)
          .set({
            id: currentUser.uid,
            userName: currentUser.displayName || userName,
            photoUrl: currentUser.photoURL || downloadedUrl,
            userEmail: currentUser.email,
            availibility: "online",
          })
          .then((res) => {
            History.push("/Chat/index");
            localStorage.setItem("isAuthnticated", true);
            localStorage.setItem("userID", auth().currentUser.uid);
            localStorage.setItem(
              "userFullName",
              currentUser.displayName || userName
            );
          });
      } else {
        // //already existing user
        // addUserInfoToStorage();
        // db.collection("users").doc(currentUser.uid).update({
        //   availibility: "online",
        // });
      }
    }
  }, [downloadedUrl]);
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

  // const addUserInfoToStorage = () => {
  //   localStorage.setItem("isAuthnticated", true);
  //   localStorage.setItem("userID", auth().currentUser.uid);
  // };

  const getStoredUserImg = async (user) => {
    await storage
      .ref("images")
      .child(user.uid)
      .getDownloadURL()
      .then((imgUrl) => {
        setDownloadedUrl(imgUrl);
        localStorage.setItem("userPic", imgUrl);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      //we can check if there`s a currentuser rather than using onAuthStateChanged
      auth().onAuthStateChanged(async function (user) {
        if (user) {
          storePhotoUrlInFirestoreStorage(user);
          setCurrentUser(user);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const storePhotoUrlInFirestoreStorage = async (user) => {
    await storage
      .ref(`/images/${user.uid}`)
      .put(selectedFile)
      .then((res) => getStoredUserImg(user));
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
      <UploadFile onFileChange={onFileChange} />
      <button type="submit" onClick={handleSubmit}>
        signup
      </button>
    </>
  );
}

export default Signup;
