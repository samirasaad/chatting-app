import React from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "./../components/Footer/Footer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthnticated =
    localStorage.getItem("isAuthnticated") && localStorage.getItem("userID");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthnticated ? (
          <>
            <Component {...props} />
            <Footer />
          </>
        ) : (
          <Redirect
            to={{ pathname: "/Login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
