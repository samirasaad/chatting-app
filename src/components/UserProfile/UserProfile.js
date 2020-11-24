import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./UserProfile.scss";
const UserProfile = () => {
  const [currentUserImg, setCurrentUserImg] = useState(null);

  useEffect(() => {
    localStorage.getItem("userID") &&
      storage
        .ref("images")
        .child(localStorage.getItem("userID"))
        .getDownloadURL()
        .then((imgUrl) => {
          setCurrentUserImg(imgUrl);
        });
  });

  return (
    <div className="mt-2 user-profile-wrapper d-flex justify-content-center flex-column align-items-center pt-4">
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
