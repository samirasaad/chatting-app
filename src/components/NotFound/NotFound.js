import React from "react";
import { pageNotFound } from "./../../utils/Images";
const NotFound = () => {
  return (
    <>
      <div className="text-center d-flex justify-content-center align-items-center">
        <img
          src={pageNotFound}
          alt="page not found"
          style={{ height: "50%", width: "50%" }}
        />
      </div>
    </>
  );
};
export default NotFound;
