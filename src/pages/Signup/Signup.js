import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Btn from "../../components/Controls/Button/Button";
import Input from "../../components/Controls/Input/Input";
import BackupIcon from "@material-ui/icons/Backup";
import { db, auth, storage } from "./../../firebase";
import { signup } from "./../../firebase/authMethods";
import History from "./../../routes/History";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Signup.scss";
import "./../Login/Login.scss";

const Signup = () => {
  const [formValues, setFormValues] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadedUrl, setDownloadedUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const supportedFormats = [
    "image/jpeg",
    "image/JPEG",
    "image/JPG",
    "image/jpg",
    "image/svg",
    "image/SVG",
  ];
  const fileSize = 1;

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
            userName: currentUser.displayName || formValues.userName,
            photoUrl: currentUser.photoURL || downloadedUrl,
            userEmail: currentUser.email,
            availibility: "online",
          })
          .then((res) => {
            localStorage.setItem("isAuthnticated", true);
            localStorage.setItem("userID", auth().currentUser.uid);
            localStorage.setItem(
              "userFullName",
              currentUser.displayName || formValues.userName
            );
            History.push("/Chat/index");
          });
      }
    }
  }, [downloadedUrl]);

  const getStoredUserImg = async (user) => {
    await storage
      .ref("images")
      .child(user.uid)
      .getDownloadURL()
      .then((imgUrl) => {
        localStorage.setItem("userPic", imgUrl);
        setDownloadedUrl(imgUrl);
      });
  };

  const handleSubmit = async (e) => {
    try {
      await signup(formValues.email, formValues.password);
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
    // setSelectedFileType(event.target.files[0].size / 1024 / 1024);
    console.log(event.target.files[0].size / 1024 / 1024);
    console.log(event.target.files[0].type);
  };

  const storePhotoUrlInFirestoreStorage = async (user) => {
    await storage
      .ref(`/images/${user.uid}`)
      .put(selectedFile)
      .then((res) => getStoredUserImg(user));
  };

  const renderSignUpForm = (props) => {
    const { handleChange, handleSubmit, values, errors } = props;
    setFormValues(values);
    console.log(props);
    return (
      <div className="form-bg p-md-5 p-3  m-auto">
        <form
          onSubmit={(values) => handleSubmit(values)}
          className="d-flex flex-column"
          noValidate
        >
          <Input
            type="text"
            name="userName"
            value={values.userName}
            handleChange={handleChange}
            className="p-3 input mb-3"
            placeholder="User Name"
            isRequired={true}
          />
          {errors.userName && (
            <small className="mb-2 text-danger">{errors.userName}</small>
          )}
          <Input
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            className="p-3 input mb-3"
            placeholder="Email"
            isRequired={true}
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
            isRequired={true}
          />
          {errors.password && (
            <small className="mb-2 text-danger">{errors.password}</small>
          )}
          <label className="upload-btn position-relative">
            <Input
              type="file"
              name="image"
              value={values.image}
              handleChange={onFileChange}
            />
            <div className="label-content h-100 w-100 d-flex ">
              <span className="position-absolute ml-5">Upload image</span>
              <BackupIcon className="ml-3" />
            </div>
          </label>
          {errors.image && (
            <small className="mb-2 text-danger">{errors.image}</small>
          )}
          <Btn
            type="submit"
            classes="p-2 primary-button mt-2 bold-font"
            text="Signup"
            handleClick={handleSubmit}
          ></Btn>
          <p className="mt-3">
            Already have an account ?
            <Link to="/Login" className="medium-font mx-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    );
  };

  return (
    <section className="form-wrapper">
      <Logo />
      <div className="form-parent d-flex justify-content-center flex-column align-items-center h-100">
        <h3 className="section-title bold-font mt-md-4 mt-3 mb-0">Sign Up</h3>
        <Formik
          initialValues={{ userName: "", email: "", password: "", image: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validateOnChange={false}
          validationSchema={Yup.object().shape({
            userName: Yup.string()
              .required("Required")
              .min(8, "user name should be at least 8 chracters"),
            email: Yup.string().required("Required").email(),
            password: Yup.string()
              .required("Required")
              .min(8, "password should be at least 8 chracters"),
          })}
        >
          {(props) => renderSignUpForm(props)}
        </Formik>
      </div>
    </section>
  );
};

export default Signup;
