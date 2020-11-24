import React, { useEffect, useState } from "react";
import { db } from "./../../firebase";
import { firebaseSignout } from "./../../firebase/authMethods";
import { logo } from "./../../utils/Images";
import SettingsBrightnessTwoToneIcon from "@material-ui/icons/SettingsBrightnessTwoTone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./NavBar.scss";
import Logo from "../Logo/Logo";

const NavBar = () => {
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
    await db
      .collection("users")
      .doc(userID)
      .update({ availibility: "offline" })
      .then(() => {
        firebaseSignout();
      })
      .catch((err) => {
        console.log(err);
        // this.props.showToast(0, err.toString());
      });
  };
  return (
    <section
      className={` ${
        isDark ? "dark-mode" : "light-mode"
      } navbar-wrapper container-fluid medium-font d-flex justify-content-between align-items-center`}
    >
      <Logo />
      {localStorage.getItem("userID") && (
        <div className="d-flex flex-wrap justify-content-end w-25 action-wrapper">
          <div className="d-flex mx-lg-2 mx-0">
            <span className='d-md-block d-none'>Dark mode</span>
            <SettingsBrightnessTwoToneIcon
              className={` ${isDark ? "mode-icon-active" : "mode-icon"} mx-1`}
              onClick={changeMode}
            />
          </div>
          <div className="d-flex ">
            <span className='d-md-block d-none'>Logout</span>
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
