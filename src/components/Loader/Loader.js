import React from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const styles = css`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 0.5em;
  overflow: hidden;
  background-color: rgba(252, 203, 255, 0.2);
  top: 0.2rem;
  left: 0;
`;

const Loader = ({ loading }) => {
  return (
    <div className="loader-icon">
      <BarLoader
        className="test"
        css={styles}
        size={30}
        height={20}
        color={"#4cbff8"}
        loading={loading}
      />
    </div>
  );
};
export default Loader;
