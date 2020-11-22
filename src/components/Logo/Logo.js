import React from 'react'
import { Link } from 'react-router-dom';
import { logo } from "./../../utils/Images";
import './Logo.scss';

const Logo = () => {
    return (
        <Link to='/' className="mb-0 container-fluid logo-wrapper">
        <img src={logo} alt="chatBoard-logo" className="logo mt-3" />
        <h3 className="brand-name mx-3 mb-0 bold-font">ChatBoard</h3>
      </Link>
    )
}

export default Logo
