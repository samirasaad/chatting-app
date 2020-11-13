import React, { useEffect, useState } from "react";
import { signin, signInWithGoogle } from "./../../firebase/authMethods";
import History from "./../../routes/History";
function Login() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEamil(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        setEamil("");
        setPassword("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      localStorage.setItem("isAuthnticated", true);
      History.push("/Chat");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleSubmit= async() =>{
    try {
      await signInWithGoogle(email, password);
      localStorage.setItem("isAuthnticated", true);
      History.push("/Chat");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <span>login page</span>
      <input type="email" name="email" value={email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        login
      </button>
      <span>or</span>
      <button type="button" onClick={handleGoogleSubmit}>
        sign in with google
      </button>
    </>
  );
}

export default Login;
