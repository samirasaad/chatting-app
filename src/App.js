import { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "./routes/History";
import Routes from "./routes/Routes";
import Footer from "./components/Footer/Footer";
import "./App.scss";

const App = () => {
  return (
    <Router history={history}>
      {Routes}
      <Footer />
    </Router>
  );
};

export default App;
