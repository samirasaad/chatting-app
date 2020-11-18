import React from "react";
const Btn = ({ disabled, text, handleClick, classes, type, hasicon, icon, altText }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`radius-ratio ${classes}`}
    >
      {hasicon && <img src={icon} alt={altText} className="mx-1" />}
      {text}
    </button>
  );
};
export default Btn;
