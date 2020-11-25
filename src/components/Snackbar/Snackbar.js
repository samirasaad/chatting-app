import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const SnackBar = ({ isOpen, text }) => {
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
      document.querySelector(".alert-wrapper").style.display = "none";
    }, 8000);

  return (
    isOpen && (
      <div className={`alert-wrapper ${classes.root}`}>
        <Alert variant="filled" severity="error">
          {text}
        </Alert>
      </div>
    )
  );
};
export default SnackBar;
