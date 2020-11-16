// import React from "react";
// import { Popover } from '@material-ui/core';
// import Picker from "emoji-picker-react";

// const Emojis = ({ handleEmojiClick }) => {
//   return <Popover
//   anchorOrigin={{
//     vertical: 'top',
//     horizontal: 'left',
//   }}
//   transformOrigin={{
//     vertical: 'top',
//     horizontal: 'left',
//   }}
// >
// <Picker onEmojiClick={handleEmojiClick} disableSearchBar={true} />
// </Popover>
// };

// export default Emojis;

import React from "react";
import Popover from "@material-ui/core/Popover";
import Picker from "emoji-picker-react";

 const Emojis =({ handleEmojiClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "emojis-popover" : undefined;

  return (
    <>
      <span
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        emojis
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Picker onEmojiClick={handleEmojiClick} disableSearchBar={true} />
      </Popover>
    </>
  );
}

export default Emojis;