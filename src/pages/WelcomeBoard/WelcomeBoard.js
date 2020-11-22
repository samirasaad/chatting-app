import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
import "./WelcomeBoard.scss";

function WelcomeBoard() {
  return (
    <div className="d-flex justify-content-center align-items-center welcome-board flex-column text-center">
      <ChatIcon className="" />
      <p className="welcome-heading medium font mb-0 my-3">
        Choose a friend to start chatting with
      </p>
    </div>
  );
}

export default WelcomeBoard;
