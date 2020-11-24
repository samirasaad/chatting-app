import React from "react";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
// import './Loader.scss'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const styles = css`
  position: fixed;
  z-index: 1000;
  bottom: 40%;
  right: 50%;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.props;
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
  }
}
export default Loader;
