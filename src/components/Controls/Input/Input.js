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
      <div className="position-relative d-flex w-100">
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
        <p className="mb-2 text-danger mx-3">{errors[`${name}`]}</p>
      )}
    </>
  );
};

export default Input;
