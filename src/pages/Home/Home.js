import React from "react";
import Lottie from "react-lottie";
import Btn from "../../components/Controls/Button/Button";
import Logo from "../../components/Logo/Logo";
import splashScreenLottie from "./../../assets/lotties/splash-screen.json";
import History from "./../../routes/History";
import "./Home.scss";
const Home = () => {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: splashScreenLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <header className="splash-screen">
      <div className='mx-4'>
      <Logo />
      </div>
      <div className="container">
        <div className="mx-0 row justify-content-center">
          <div className="col-md-6 mt-lg-5 mt-0 py-md-5 py-0">
            <h4 className="main-text medium-font">
              Make Your Life Easier, Use ChatBoard
            </h4>
            {!localStorage.getItem("userID") && (
              <div className="d-flex flex-wrap  mt-lg-5 mt-0">
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
          <div className="lottie col-lg-6 col-md-7 col-9 mt-md-0 mt-4">
            <Lottie options={defaultLottieOptions} />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Home;
