import React from "react";
const Btn = ({ disabled, text, handleClick, classes }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`radius-ratio ${classes}`}
    >
      {text}
    </button>
  );
};
export default Btn;
