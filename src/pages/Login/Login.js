import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { signin, signInWithGoogle } from "./../../firebase/authMethods";
import Divider from "@material-ui/core/Divider";
import Loader from "../../components/Loader/Loader";
import SnackBar from "../../components/Snackbar/Snackbar";
import Btn from "../../components/Controls/Button/Button";
import Input from "./../../components/Controls/Input/Input";
import { googleIcon } from "./../../utils/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { db, auth } from "./../../firebase";
import History from "./../../routes/History";
import { USERS, ONLINE } from "./../../utils/constants";
import "./Login.scss";

function Login() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firebaseErrMsg, setFirebaseErrMsg] = useState("");
  const [formValues, setFormValues] = useState({});

  const getCurrentUserInfo = async (id) => {
    setLoading(true);
    await db
      .collection(USERS)
      .doc(id)
      .get()
      .then((doc) => {
        localStorage.setItem("isDark", false);
        localStorage.setItem("isAuthnticated", true);
        localStorage.setItem("userID", doc.data().id);
        localStorage.setItem("userPic", doc.data().photoUrl);
        localStorage.setItem(
          "userFullName",
          doc.data().userName
            ? doc.data().userName.trim().charAt(0).toUpperCase() +
                doc.data().userName.slice(1)
            : ""
        );
        History.push("/Chat");
        setLoading(false);
      })
      .catch((err) => {
        setIsOpen(true);
        setFirebaseErrMsg(err.message);
      });
  };

  const addUser = async () => {
    setLoading(true);
    try {
      let usersList = [];
      auth().onAuthStateChanged(async function (user) {
        if (user) {
          await db
            .collection(USERS)
            .where("id", "==", user.uid)
            .get()
            .then((querySnapshot) => {
              usersList = querySnapshot.docs.map((doc) => {
                return doc.data();
              });
              setLoading(false);
            })
            .catch((err) => {
              setIsOpen(true);
              setFirebaseErrMsg(err.message);
            });
          if (usersList.length === 0) {
            setLoading(true);
            //if new user, set it to users collection
            db.collection(USERS)
              .doc(user.uid)
              .set({
                id: user.uid,
                userName: user.displayName,
                photoUrl: user.photoURL,
                userEmail: user.email,
                availibility: ONLINE,
              })
              .then((res) => {
                getCurrentUserInfo(user.uid);
                setLoading(false);
              })
              .catch((err) => {
                setIsOpen(true);
                setFirebaseErrMsg(err.message);
              });
          } else {
            db.collection(USERS)
              .doc(user.uid)
              .update({
                availibility: ONLINE,
              })
              .then((res) => {
                getCurrentUserInfo(user.uid);
                setLoading(false);
              })
              .catch((err) => {
                setIsOpen(true);
                setFirebaseErrMsg(err.message);
              });
          }
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      setLoading(false);
      setIsOpen(true);
      setFirebaseErrMsg(err.message);
    }
  };

  const handleSubmitGoogle = async () => {
    await signInWithGoogle(formValues.email, formValues.password)
      .then()
      .catch((err) => {
        setLoading(false);
        setIsOpen(true);
        setFirebaseErrMsg(err.message);
      });
    addUser();
  };

  const handleSubmit = async (values) => {
    if (values.email && values.password) {
      setLoading(true);
      await signin(values.email, values.password)
        .then()
        .catch((err) => {
          setLoading(false);
          setIsOpen(true);
          setFirebaseErrMsg(err.message);
        });
      addUser();
    }
  };

  const renderLoginForm = (props) => {
    const { handleChange, handleSubmit, values, errors } = props;
    setFormValues(values);
    return (
      <div className="form-bg p-md-5 p-3 m-auto">
        <form
          onSubmit={(values) => handleSubmit(values)}
          className="d-flex flex-column"
          noValidate
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
            classes="p-2 primary-button bold-font"
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
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="form-wrapper">
      <div className="mx-4">
        <Logo />
      </div>
      {loading && <Loader loading={loading} />}
      {isOpen && (
        <SnackBar
          isOpen={isOpen}
          text={firebaseErrMsg}
          handleClose={handleClose}
        />
      )}
      <div className="form-parent d-flex justify-content-center flex-column align-items-center">
        <h3 className="form-title bold-font mt-md-4 mt-3 mb-0">Login</h3>
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
