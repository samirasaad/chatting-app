import React, { useState } from "react";
import { db, auth } from "./../../firebase";
import { signin, signInWithGoogle } from "./../../firebase/authMethods";
import { Formik } from "formik";
import * as Yup from "yup";
import { logo } from "./../../utils/Images";
import History from "./../../routes/History";
import "./Login.scss";
function Login() {
  const [formValues, setFormValues] = useState({});

  const addUserInfoToStorage = () => {
    localStorage.setItem("isAuthnticated", true);
    localStorage.setItem("userID", auth().currentUser.uid);
    // localStorage.setItem("userPic", auth().currentUser.photoURL);
    // localStorage.setItem("userFullName", auth().currentUser.displayName);
    // localStorage.setItem("userEmail", auth().currentUser.email);
  };

  const addUser = async () => {
    try {
      let usersList = [];
      auth().onAuthStateChanged(async function (user) {
        if (user) {
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
              availibility: "online",
            });
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

  const handleSubmitGoogle = async () => {
    await signInWithGoogle(formValues.email, formValues.password);
    addUser();
  };

  const handleSubmit = async (values) => {
    values.email &&
      values.password &&
      (await signin(values.email, values.password));
    addUser();
  };

  const renderLoginForm = (props) => {
    const { handleChange, handleSubmit, values, errors } = props;
    setFormValues(values);
    return (
      <form onSubmit={(values) => handleSubmit(values)} noValidate>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">login</button>
        <span>or</span>
        <button type="button" onClick={(e) => handleSubmitGoogle(values)}>
          sign in with google
        </button>
      </form>
    );
  };

  return (
    <section className="login-wrapper">
      <div className="mb-0 py-2 container-fluid">
        <img src={logo} alt="chatBoard-logo" className="logo" />
        <h3 className="brand-name mx-3 mb-0">ChatBoard</h3>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
        validateOnChange={false}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(),
        })}
      >
        {(props) => renderLoginForm(props)}
      </Formik>
    </section>
  );
}

export default Login;
