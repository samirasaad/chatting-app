import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./UserProfile.scss";
const UserProfile = () => {
  return (
    <div className="mt-2 mb-3 user-profile-wrapper d-flex justify-content-center flex-column align-items-center pt-2">
      <UserAvatar
        img={localStorage.getItem("userPic")}
        size="large"
        statusClass="status-circle-large"
      />
      <h4 className="user-name medium-font mt-2">
        {localStorage.getItem("userFullName")}
      </h4>
    </div>
  );
};

export default UserProfile;
