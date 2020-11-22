import React from "react";
import Lottie from "react-lottie";
import Btn from "../../components/Controls/Button/Button";
import Logo from "../../components/Logo/Logo";
import splashScreenLottie from "./../../assets/lotties/splash-screen.json";
import splashScreenLottie2 from "./../../assets/lotties/splash-screen-2.json";
import History from "./../../routes/History";
import "./Home.scss";
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: splashScreenLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <header className="splash-screen">
      <Logo />
      <div className="container">
        <div className="mx-0 row justify-content-center">
          <div className="col-md-6 mt-5 py-md-5 py-0">
            <h4 className="main-text medium-font">
              Make Your Life Easier, Use ChatBoard
            </h4>
            {!localStorage.getItem("userID") && (
              <div className="d-flex flex-wrap  mt-md-5 mt-0">
                <Btn
                  text="Log In"
                  handleClick={() => {
                    History.push("/Login");
                  }}
                  classes="primary-button px-md-5 px-4 py-2  bold-font"
                />
                <Btn
                  text="Sign Up"
                  handleClick={() => {
                    History.push("/Signup");
                  }}
                  classes="secondary-button px-md-5 px-4 py-2  bold-font mx-1 mx-lg-3"
                />
              </div>
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
