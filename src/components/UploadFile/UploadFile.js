import React from "react";
import Input from "../Controls/Input/Input";

const UploadFile = ({ onFileChange }) => {
  return <Input type="file" handleChange={onFileChange} />;
};

export default UploadFile;
