import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="d-flex justify-content-center footer-wrapper align-items-center">
      <a href="https://github.com/samirasaad">
        <GitHubIcon className="mx-2" />
      </a>
      <a href="https://www.linkedin.com/in/samira-saad-13241b167/">
        <LinkedInIcon className="mx-2" />
      </a>
    </footer>
  );
};
export default Footer;
