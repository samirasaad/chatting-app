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
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    fileName: "",
    fileSize: 0,
    fileType: "",
  });
  const [fileErr, setFileErr] = useState({
    sizeErr: false,
    typeErr: false,
    msg: "",
  });
  const [downloadedUrl, setDownloadedUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const fileSupportedFormats = [
    "image/JPEG",
    "image/JPG",
    "image/jpg",
    "image/png",
    "image/PNG",
    "image/JPEG",
    "image/jpeg",
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
            History.push("/Chat");
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
        console.log(imgUrl);
        localStorage.setItem("userPic", imgUrl);
        setDownloadedUrl(imgUrl);
      });
  };

  const handleSubmit = async (e) => {
    checkSelectedFileValidation();
    if (!fileErr.sizeErr && !fileErr.typeErr) {
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
    }
  };

  const onFileChange = (event) => {
    setSelectedFile({
      file: event.target.files[0],
      fileName: event.target.files[0].name,
      fileSize: event.target.files[0].size, //size in bytes
      fileType: event.target.files[0].type,
    });
  };

  const checkSelectedFileValidation = () => {
    if (selectedFile.fileSize && selectedFile.fileType) {
      setFileErr({
        typeErr: !fileSupportedFormats.includes(selectedFile.fileType),
        sizeErr: selectedFile.fileSize / 1024 / 1024 > fileSize,
        msg: !fileSupportedFormats.includes(selectedFile.fileType)
          ? "Image type is not supported jpg, jpeg and png only"
          : selectedFile.fileSize / 1024 / 1024 > fileSize
          ? "Image size is too large, maximum 2 Mb"
          : "",
      });
    }
  };

  const storePhotoUrlInFirestoreStorage = async (user) => {
    await storage
      .ref(`/images/${user.uid}`)
      .put(selectedFile.file)
      .then((res) => getStoredUserImg(user));
  };

  const renderSignUpForm = (props) => {
    const { handleChange, handleSubmit, values, errors } = props;
    setFormValues(values);
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
            errors={errors}
          />
          <Input
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            className="p-3 input mb-3"
            placeholder="Email"
            isRequired={true}
            errors={errors}
          />
          <Input
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            className="p-3 input mb-3"
            placeholder="Password"
            isRequired={true}
            errors={errors}
          />
          <label className="upload-btn position-relative d-flex  justify-content-center">
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
          {selectedFile && (
            <span className="mx-2 medium-font seleceted-img-name">
              {selectedFile.fileName}
            </span>
          )}

          {fileErr.msg && (
            <p className="mb-2 mx-2 text-danger">{fileErr.msg}</p>
          )}
          <Btn
            type="submit"
            classes="p-2 primary-button mt-1 bold-font"
            text="Signup"
            handleClick={checkSelectedFileValidation}
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
      <div className="form-parent d-flex justify-content-center flex-column align-items-center">
        <h3 className="form-title bold-font mt-md-4 mt-3 mb-0">Sign Up</h3>
        <Formik
          initialValues={{ userName: "", email: "", password: "", image: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validateOnChange={false}
          validationSchema={Yup.object().shape({
            userName: Yup.string()
              .required("Required")
              .min(8, "Username should be at least 8 chracters")
              .max(25, "Username is too large, Maximum 25 character"),
            email: Yup.string()
              .required("Required")
              .email("Email must be a valid email")
              .max(320, "Email must be a valid email"),
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
