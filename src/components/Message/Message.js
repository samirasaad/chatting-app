import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import moment from "moment";
import { ONLINE } from "./../../utils/constants";

const Message = ({
  peerUserInfo: {
    peerUserPicurl,
    peerUserAvailibility,
  },
  currentUserPic,
  message: { idFrom, content, timestamp },
  index,
}) => {
  const renderMessages = () => {
    if (idFrom === localStorage.getItem("userID")) {
      return (
        <div key={index} className="d-flex px-3 my-4 justify-content-end">
          <div className="d-flex flex-column align-items-end">
            <p className="position-relative msg-bg-current-user mx-3 p-2 mb-0">
              {content}
            </p>
            <small className="mx-3 time">
              {moment(timestamp * 1000).format("DD/MM/YYYY , h:mm A")}
            </small>
          </div>
          <UserAvatar
            img={currentUserPic}
            size="small"
            statusClass="status-circle-small"
          />
        </div>
      );
    } else {
      return (
        <div key={index} className="d-flex px-3 my-4 justify-content-start">
          <UserAvatar
            img={peerUserPicurl}
            size="small"
            statusClass={`${
              peerUserAvailibility === ONLINE && "status-circle-small"
            } `}
          />
          <div className="d-flex flex-column align-items-start">
            <p className="position-relative msg-bg-peer-user mx-3 p-2 mb-0">
              {content}
            </p>
            <small className="mx-3 time">
              {moment(timestamp * 1000).format("DD/MM/YYYY , h:mm A")}
            </small>
          </div>
        </div>
      );
    }
  };
  return renderMessages();
};

export default Message;
