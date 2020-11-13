import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return <div className="bold-font">
    <Link to='/Login' >login</Link>
    <Link to='/Signup' >signup</Link>
  </div>;
};
export default Home;
