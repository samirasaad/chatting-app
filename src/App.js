import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Home from "./Home/Home";
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
  return <Home />;
}

export default App;
