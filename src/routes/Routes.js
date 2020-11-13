import React, { Suspense } from "react";
import { Router, Switch } from "react-router-dom";
import history from "./History";
import * as LazyComponent from "../utils/Lazyloaded";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const Routes = (
  <Suspense fallback={"Loading"}>
    <Router history={history}>
      <Switch>
        <LazyComponent.Home path="/" exact />
        <LazyComponent.Login path="/Login" exact />
        <LazyComponent.Signup path="/Signup" exact />
      </Switch>
    </Router>
  </Suspense>
);
export default Routes;
