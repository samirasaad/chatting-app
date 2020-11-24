import React from "react";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import PanToolIcon from "@material-ui/icons/PanTool";

const NoChat = ({ peerUserPicurl, peerUserAvailibility, peerUserName }) => {
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <UserAvatar
        img={peerUserPicurl}
        size="large"
        statusClass={`${
          peerUserAvailibility === "online" && "status-circle-large"
        } `}
      />
      <p className="user-name mt-3 d-flex flex-column align-items-center bold-font">
        {peerUserName}
      </p>
      <span className="text-center">
        There is no chat between you and
        <span className="medium-font mx-1 peer-user-name">{peerUserName}</span>,
        Say hi
      </span>
      <PanToolIcon className="say-hi-icon mt-4" />
    </div>
  );
};

export default NoChat;
