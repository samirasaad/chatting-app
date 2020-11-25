import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const SnackBar = ({ isOpen, text, handleClose }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: "20%",
      color: "#fff",
      position: "fixed",
      bottom: "13px",
      right: "3em",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  document.querySelector(".alert-wrapper") &&
    setTimeout(() => {
      isOpen = false;
    }, 8000);

  return (
    isOpen && (
      <div className={`alert-wrapper ${classes.root}`}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {text}
        </Alert>
      </div>
    )
  );
};
export default SnackBar;
