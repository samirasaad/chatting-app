import React from "react";
import { Link } from "react-router-dom";
// import { logo } from "./../../utils/Images";
import ChatIcon from "@material-ui/icons/Chat";
import "./Logo.scss";

const Logo = () => {
  return (
    <Link to="/" className="mb-0 mt-2 container-fluid logo-wrapper ">
      <div className="d-flex flex-column">
        {/* <img src={logo} alt="chatBoard-logo" className="logo mt-3" /> */}
        <ChatIcon className="logo mx-4" />
        <h3 className="brand-name mx-1 mb-0 bold-font">ChatBoard</h3>
      </div>
    </Link>
  );
};

export default Logo;
