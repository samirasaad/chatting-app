import React from "react";

export const Home = React.lazy(() => import("../pages/Home/Home"));
export const Login = React.lazy(() => import("../pages/Login/Login"));
export const Signup = React.lazy(() => import("../pages/Signup/Signup"));
export const Chat = React.lazy(() => import("../pages/Chat/Chat"));

// export const NotFound = React.lazy(() =>
//   import("../components/NotFound/NotFound")
// )