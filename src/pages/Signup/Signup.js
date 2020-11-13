import React, { useState } from "react";
import {signup} from './../../firebase/authMethods';
import History from './../../routes/History';
function Signup() {
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
        await signup(email, password);
        localStorage.setItem('isAuthnticated',true);
        History.push('/Chat')
      } catch (error) {
       console.log(error.message)
      }
  };
  return (
    <>
      <span>signup page</span>
      <input type="email" name="email" value={email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        signup
      </button>
    </>
  );
}

export default Signup;
