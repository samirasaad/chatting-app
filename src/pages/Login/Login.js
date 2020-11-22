import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { signin, signInWithGoogle } from "./../../firebase/authMethods";
import Divider from "@material-ui/core/Divider";
import Btn from "../../components/Controls/Button/Button";
import Input from "./../../components/Controls/Input/Input";
import { googleIcon } from "./../../utils/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { db, auth } from "./../../firebase";
import History from "./../../routes/History";
import "./Login.scss";

function Login() {
  const [formValues, setFormValues] = useState({});

  const getCurrentUserInfo = async (id) => {
    await db
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        localStorage.setItem("isAuthnticated", true);
        localStorage.setItem("userID", doc.data().id);
        localStorage.setItem("userPic", doc.data().photoUrl);
        localStorage.setItem("userFullName", doc.data().userName);
        History.push("/Chat");
      })
      .catch((err) => console.log(err));
  };

  const addUser = async () => {
    try {
      let usersList = [];
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
            //new user set it to users collection
            db.collection("users")
              .doc(user.uid)
              .set({
                id: user.uid,
                userName: user.displayName,
                photoUrl: user.photoURL,
                userEmail: user.email,
                availibility: "online",
              })
              .then((res) => {
                getCurrentUserInfo(user.uid);
              });
          } else {
            db.collection("users")
              .doc(user.uid)
              .update({
                availibility: "online",
              })
              .then((res) => {
                getCurrentUserInfo(user.uid);
                // History.push("/Chat/index");
              });
          }
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
      <div className="form-bg p-md-5 p-3  m-auto">
        <form
          onSubmit={(values) => handleSubmit(values)}
          noValidate
          className="d-flex flex-column"
        >
          <Input
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            className="p-3 input mb-3"
            placeholder="Email"
          />
          {errors.email && (
            <small className="mb-2 text-danger">{errors.email}</small>
          )}
          <Input
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            className="p-3 input mb-3"
            placeholder="Password"
          />
          <Btn
            type="submit"
            classes="p-2 primary-button mt-2 bold-font"
            text="Login"
            handleClick={handleSubmit}
          ></Btn>
          <div className="d-flex align-items-center justify-content-between">
            <Divider component="div" className="my-4 divider" />
            <span className="text-muted">OR</span>
            <Divider component="div" className="my-4 divider" />
          </div>
          <Btn
            type="button"
            classes="p-2 sign-in-goole bold-font"
            text="Sign in with google"
            handleClick={(e) => handleSubmitGoogle(values)}
            hasicon={true}
            icon={googleIcon}
            altText="google-icon"
          ></Btn>
          <p className="mt-3">
            Don't have an account ?
            <Link to="/signUp" className="medium-font mx-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    );
  };

  return (
    <section className="login-wrapper">
      <Logo />
      <div className="form-parent d-flex justify-content-center flex-column align-items-center h-100">
        <h3 className="section-title bold-font mt-md-5 mt-3 mb-0">Login</h3>
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
      </div>
    </section>
  );
}

export default Login;
