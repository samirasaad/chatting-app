import React from "react";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const styles = css`
  position: fixed;
  z-index: 1000;
  bottom: 40%;
  right: 50%;
`;

const Loader = ({ loading }) => {
  return (
    <div className="loader-icon">
      <PulseLoader
        className="test"
        css={styles}
        size={30}
        color={"#fccbff"}
        loading={loading}
      />
    </div>
  );
};
export default Loader;
