import React from "react";
import Picker from "emoji-picker-react";

const Emojis = ({ handleEmojiClick }) => {
  return <Picker onEmojiClick={handleEmojiClick} disableSearchBar={true} />;
};

export default Emojis;
