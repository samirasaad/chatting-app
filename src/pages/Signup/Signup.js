import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Loader from "../../components/Loader/Loader";
import Btn from "../../components/Controls/Button/Button";
import Input from "../../components/Controls/Input/Input";
import Snackbar from "../../components/Snackbar/Snackbar";
import BackupIcon from "@material-ui/icons/Backup";
import { db, auth, storage } from "./../../firebase";
import { signup } from "./../../firebase/authMethods";
import History from "./../../routes/History";
import { Formik } from "formik";
import * as Yup from "yup";
import { USERS, ONLINE, IMAGES } from "./../../utils/constants";
import "./Signup.scss";
import "./../Login/Login.scss";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firebaseErrMsg, setFirebaseErrMsg] = useState("");
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
  const [currentUser, setCurrentUser] = useState({
    id: null,
    userName: null,
    photoUrl: null,
    userEmail: null,
  });

  const fileSupportedFormats = [
    "image/JPEG",
    "image/JPG",
    "image/jpg",
    "image/png",
    "image/PNG",
    "image/JPEG",
    "image/jpeg",
  ];

  const fileSize = 1; //1MB

  useEffect(() => {
    if (downloadedUrl) {
      setLoading(true);
      let usersList = [];
      db.collection(USERS)
        .where("id", "==", currentUser.id)
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
        //if new user, store it intto users collection
        db.collection(USERS)
          .doc(currentUser.id)
          .set({
            id: currentUser.id,
            userName: formValues.userName
              ? formValues.userName.trim().charAt(0).toUpperCase() +
                formValues.userName.slice(1)
              : currentUser.displayName,
            photoUrl: downloadedUrl ? downloadedUrl : currentUser.photoURL,
            userEmail: currentUser.userEmail,
            availibility: ONLINE,
          })
          .then((res) => {
            History.push("/chat");
          })
          .catch((err) => {
            setIsOpen(true);
            setFirebaseErrMsg(err.message);
          });
      } else {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadedUrl, currentUser]);

  const getStoredUserImg = async () => {
    setLoading(true);
    await storage
      .ref(IMAGES)
      .child(currentUser.id)
      .getDownloadURL()
      .then((imgUrl) => {
        localStorage.setItem("isDark", false);
        localStorage.setItem("isAuthnticated", true);
        localStorage.setItem("userPic", imgUrl);
        localStorage.setItem("userID", currentUser.id);
        localStorage.setItem(
          "userFullName",
          currentUser.displayName
            ? currentUser.displayName
            : formValues.userName.trim().charAt(0).toUpperCase() +
                formValues.userName.slice(1)
        );
        setDownloadedUrl(imgUrl);
        setLoading(false);
      })
      .catch((err) => {
        setIsOpen(true);
        setFirebaseErrMsg(err.message);
      });
  };

  const handleSubmit = async (e) => {
    setIsOpen(false);
    checkSelectedFileValidation();
    if (!fileErr.sizeErr && !fileErr.typeErr) {
      try {
        setLoading(true);
        await signup(formValues.email, formValues.password)
          .then((res) => {
            auth().onAuthStateChanged(async function (user) {
              if (user) {
                console.log(user.displayName);
                console.log(formValues.userName);
                setCurrentUser({
                  id: user.uid,
                  photoUrl: user.photoURL || downloadedUrl,
                  userName: user.displayName || formValues.userName,
                  userEmail: user.email || formValues.email,
                });
              }
            });
          })
          .catch((err) => {
            setLoading(false);
            setIsOpen(true);
            setFirebaseErrMsg(err.message);
          });
      } catch (err) {
        setLoading(false);
        setIsOpen(true);
        setFirebaseErrMsg(err.message);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      if (currentUser.id) {
        storePhotoUrlInFirestoreStorage();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

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
          ? "Image size is too large, maximum 1 Mb"
          : "",
      });
    }
  };

  const storePhotoUrlInFirestoreStorage = async () => {
    setLoading(true);
    await storage
      .ref(`/${IMAGES}/${currentUser.id}`)
      .put(selectedFile.file)
      .then((res) => getStoredUserImg())
      .catch((err) => {
        setIsOpen(true);
        setFirebaseErrMsg(err.message);
      });
  };

  const renderSignUpForm = (props) => {
    const { handleChange, handleSubmit, values, errors } = props;
    setFormValues(values);
    return (
      <div className="form-bg px-md-5 px-3 pb-3 m-auto">
        <form
          onSubmit={(values) => handleSubmit(values)}
          className="d-flex flex-column mt-3"
          noValidate
        >
          <label className="upload-btn m-auto flex-column d-flex  mt-3 justify-content-center">
            <Input
              type="file"
              name="image"
              value={values.image}
              handleChange={onFileChange}
            />
            <div className="label-content mb-4 d-flex justify-content-center align-items-center flex-column">
              <BackupIcon className="" />
              <span className="">Upload image</span>
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
          <Input
            type="text"
            name="userName"
            value={values.userName}
            handleChange={handleChange}
            className="p-3 input mb-3 mt-2"
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
          <Btn
            type="submit"
            classes="p-2 primary-button  bold-font"
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
        <Snackbar
          isOpen={isOpen}
          text={firebaseErrMsg}
          handleClose={handleClose}
        />
      )}
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
