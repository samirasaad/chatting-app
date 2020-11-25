import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import SnackBar from "../Snackbar/Snackbar";
import Logo from "../Logo/Logo";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { firebaseSignout } from "./../../firebase/authMethods";
import { moon, sun } from "./../../utils/Images";
import { db } from "./../../firebase";
import "./NavBar.scss";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [firebaseErrMsg, setFirebaseErrMsg] = useState("");
  const userID = localStorage.getItem("userID");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(JSON.parse(localStorage.getItem("isDark")) || false);
  }, []);

  const changeMode = () => {
    setIsDark(!isDark);
    localStorage.setItem("isDark", !isDark);
    //chat-wrapper
    document.querySelector(".chat-wrapper").classList.toggle("dark-mode");
    document.querySelector(".chat-wrapper").classList.toggle("light-mode");
    //navbar
    document.querySelector(".navbar-wrapper").classList.toggle("dark-mode");
    document.querySelector(".navbar-wrapper").classList.toggle("light-mode");
    //footer
    document.querySelector(".footer-wrapper").classList.toggle("dark-mode");
    document.querySelector(".footer-wrapper").classList.toggle("light-mode");
  };

  const handleLogout = async () => {
    setLoading(true);
    await db
      .collection("users")
      .doc(userID)
      .update({ availibility: "offline" })
      .then(() => {
        firebaseSignout();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setIsOpen(true);
        setFirebaseErrMsg(err.message);
      });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section
      className={` ${
        isDark ? "dark-mode" : "light-mode"
      } navbar-wrapper container-fluid medium-font d-flex justify-content-between align-items-center`}
    >
      <Logo />
      <Loader loading={loading} />
      {isOpen && (
        <SnackBar
          isOpen={isOpen}
          text={firebaseErrMsg}
          handleClose={handleClose}
        />
      )}
      {localStorage.getItem("userID") && (
        <div className="d-flex flex-wrap justify-content-end w-25 action-wrapper">
          <div className="d-flex mx-lg-2 mx-0 align-items-center">
            <span className="d-md-block d-none">Mode</span>
            <img
              className="mode-icon"
              src={isDark ? moon : sun}
              alt="mode-icon"
              onClick={changeMode}
            />
          </div>
          <div className="d-flex align-items-center">
            <span className="d-md-block d-none">Logout</span>
            <ExitToAppIcon
              className="logout-icon mx-1"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;
