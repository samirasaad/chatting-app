import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "./UserAvatar.scss";
const UserAvatar = ({ img, size, variant, className, statusClass }) => {
  const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    medium: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
    large: {
      width: theme.spacing(21),
      height: theme.spacing(21),
    },
  }));
  const classes = useStyles();
  return (
    <div className="userAvatar-wraper position-relative">
      <Avatar
        variant={variant}
        src={img}
        className={`${classes[size]} ${className}`}
      />
      <div className={`position-absolute ${statusClass}`}></div>
    </div>
  );
};
export default UserAvatar;
