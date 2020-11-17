import React from "react";
import { Link } from "react-router-dom";
import { logo } from "./../../utils/Images";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <section className="navbar-wrapper py-2 px-5 medium-font">
      <Link to='/'>
      <img src={logo} alt="chatBoard-logo" className="logo" />
        <h3 className="brand-name mx-3">ChatBoard</h3>
      </Link>
    </section>
  );
};

export default NavBar;
