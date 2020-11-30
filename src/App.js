import { Router } from "react-router-dom";
import history from "./routes/History";
import Routes from "./routes/Routes";
import "./App.scss";

const App = () => {
  if (localStorage.getItem("isDark") === "true") {
    document.querySelector("#root").classList.add("dark-mode");
    document.querySelector("#root").classList.remove("light-mode");
  }else{
    localStorage.setItem('isDark','false')
  }
  return <Router history={history}>{Routes}</Router>;
};

export default App;
