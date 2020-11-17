import React from "react";
import { Link } from "react-router-dom";
import { db, auth } from "./../../firebase";
import { firebaseSignout } from "./../../firebase/authMethods";
import { logo } from "./../../utils/Images";
import SettingsBrightnessTwoToneIcon from "@material-ui/icons/SettingsBrightnessTwoTone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./NavBar.scss";

const NavBar = () => {
  const user = auth().currentUser;
  const changeMode = () => {
    document.querySelector(".chat-wrapper").classList.toggle("dark-mode");
    document.querySelector(".chat-wrapper").classList.toggle("light-mode");
    document.querySelector(".mode-icon").classList.toggle("mode-icon-active");
  };

  const handleLogout = async () => {
    if (user) {
      await db
        .collection("users")
        .doc(user.uid)
        .update({ availibility: "offline" })
        .then(() => {
          firebaseSignout();
        })
        .catch((err) => {
          console.log(err);
          // this.props.showToast(0, err.toString());
        });
    }
  };
  return (
    <section className="navbar-wrapper py-2 px-5 medium-font d-flex justify-content-between align-items-center">
      <Link to="/">
        <img src={logo} alt="chatBoard-logo" className="logo" />
        <h3 className="brand-name mx-3">ChatBoard</h3>
      </Link>
      <div className="d-flex">
        <div className="d-flex mx-3">
          <span>Dark mode</span>
          <SettingsBrightnessTwoToneIcon
            className="mode-icon mx-1"
            onClick={changeMode}
          />
        </div>
        <div className="d-flex ">
          <span>Logout</span>
          <ExitToAppIcon className="logout-icon mx-1" onClick={handleLogout} />
        </div>
      </div>
    </section>
  );
};

export default NavBar;
