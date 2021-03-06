import React from "react";
import { Link } from "react-router-dom";
import ChatIcon from "@material-ui/icons/Chat";
import "./Logo.scss";

const Logo = () => {
  return (
    <div className="d-flex flex-column logo-container">
      <Link to="/" className="mb-0 mt-2 container-fluid logo-wrapper ">
        <ChatIcon className="logo mx-4" />
        <h3 className="brand-name mx-1 mb-0 bold-font">ChatBoard</h3>
      </Link>
    </div>
  );
};

export default Logo;
