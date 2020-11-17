import { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "./routes/History";
// import { auth } from "./firebase";
import Routes from "./routes/Routes";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.scss";
const App = () => {
  return (
    <Router history={history}>
      <NavBar />
      {Routes}
      <Footer />
    </Router>
  );
};
export default App;
