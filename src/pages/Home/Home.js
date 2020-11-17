import React from "react";
import Lottie from "react-lottie";
import Btn from "../../components/Controls/Button/Button";
import splashScreenLottie from "./../../assets/lotties/splash-screen.json";
import splashScreenLottie2 from "./../../assets/lotties/splash-screen-2.json";
import splashScreenLottie3 from "./../../assets/lotties/splash-screen-3.json";
import History from "./../../routes/History";
import "./Home.scss";
import { Link } from "react-router-dom";
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: splashScreenLottie2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <header className="splash-screen">
      <div className="container">
        <div className="mx-0 row align-items-center justify-content-center">
          <div className="col-md-6">
            <h4 className="main-text medium-font">
              Chatting Makes Life Easier
            </h4>
            {!localStorage.getItem("userID") ? (
              <>
                <p className="main-text">Let`s Start...</p>
                <Btn
                  text="Log In"
                  handleClick={() => {
                    History.push("/Login");
                  }}
                  classes="primary-button px-5 py-3  bold-font"
                />
                <Btn
                  text="Sign Up"
                  handleClick={() => {
                    History.push("/Signup");
                  }}
                  classes="secondary-button px-5 py-3  bold-font mx-3"
                />
              </>
            ) : (
              <Link
                className="start-chatting-link medium-font"
                to="/chat/index"
              >
                Start Chatting
              </Link>
            )}
          </div>
          <div className="lottie col-md-6 col-9">
            <Lottie options={defaultOptions} />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Home;
