import React from "react";
import Emojis from "../../components/Emojis/Emojis";
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
        className="send-msg-bar d-flex align-items-baseline position-absolute"
        onSubmit={handleSubmitMessage}
      >
        <input
          className="send-msg w-100"
          type="text"
          onChange={handleChange}
          value={message}
          placeholder='Enter your message'
        />
        <Emojis handleEmojiClick={handleChooseEmoji} />
        <p className="send-btn mx-3 py-2">
          <SendOutlinedIcon onClick={handleSubmitMessage} className={`${!message && 'disable-send-msg'}`}/>
        </p>
      </form>
    </>
  );
};

export default SendMsgBar;