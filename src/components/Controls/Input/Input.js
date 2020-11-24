import React from "react";

const Input = ({
  className,
  type,
  handleChange,
  value,
  placeholder,
  name,
  id,
  isRequired,
  errors,
}) => {
  return (
    <>
      <div className="position-relative d-flex">
        <input
          name={name}
          id={id}
          className={`w-100 ${className}`}
          type={type}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
        {isRequired && (
          <span className="text-danger ml-2" style={{ fontSize: "1.5em" }}>
            *
          </span>
        )}
      </div>
      {errors && errors[`${name}`] && (
        <small className="mb-2 text-danger mx-3">{errors[`${name}`]}</small>
      )}
    </>
  );
};

export default Input;
