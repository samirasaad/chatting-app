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
        {/* lazy route means that user either authnticated or not */}
        <LazyComponent.Home path="/" exact />
        {/* public route means that user is not authnticated */}
        <PublicRoute component={LazyComponent.Login} path="/Login" exact />
        <PublicRoute component={LazyComponent.Signup} path="/Signup" exact />
        {/* private route means that user is authnticated */}
        <PrivateRoute component={LazyComponent.Chat} path="/Chat/:id" exact />
      </Switch>
    </Router>
  </Suspense>
);
export default Routes;
