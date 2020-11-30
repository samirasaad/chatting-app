import React from "react";
import Emojis from "../../components/Emojis/Emojis";
import Input from "../Controls/Input/Input";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import "./SendMsg.scss";
const SendMsgBar = ({
  handleSubmitMessage,
  handleChange,
  handleChooseEmoji,
  message,
}) => {
  return (
    <>
      <form
        className="content send-msg-bar d-flex align-items-baseline position-sticky p-2"
        onSubmit={handleSubmitMessage}
      >
        <Input
          className="send-msg w-100 pl-3 pr-5 py-3"
          type="text"
          handleChange={handleChange}
          value={message}
          placeholder="Enter your message"
        />
        <Emojis handleEmojiClick={handleChooseEmoji} />
        <div className="send-btn">
          <SendOutlinedIcon
            onClick={handleSubmitMessage}
            className={`${!message && "disable-send-msg"}`}
          />
        </div>
      </form>
    </>
  );
};

export default SendMsgBar;
