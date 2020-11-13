import { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "./routes/History";
import { auth } from "./firebase";
import Routes from "./routes/Routes";
import "./App.scss";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);
  return <Router history={history}>{Routes}</Router>;
}
export default App;
