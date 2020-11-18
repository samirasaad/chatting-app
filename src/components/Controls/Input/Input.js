import React from "react";

const Input = ({
  className,
  type,
  handleChange,
  value,
  placeholder,
  name,
  id,
}) => {
  return (
    <input
      name={name}
      id={id}
      className={`${className}`}
      type={type}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
