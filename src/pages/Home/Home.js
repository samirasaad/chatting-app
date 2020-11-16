import React from "react";
import Lottie from "react-lottie";
import splashScreenLottie from "./../../assets/lotties/splash-screen.json";
import splashScreenLottie2 from "./../../assets/lotties/splash-screen-2.json";
import splashScreenLottie3 from "./../../assets/lotties/splash-screen-3.json";
import "./Home.scss";
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: splashScreenLottie3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <header className="splash-screen">
      <div className="container">
        <div className="mx-0 row align-items-center">
          <div className="col-md-6">
            <p className='main-text medium-font'>
              some text some text some text some textvsome textsome textsome
              textsome textsome text
            </p>
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
