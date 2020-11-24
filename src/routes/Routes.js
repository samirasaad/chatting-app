import React, { Suspense } from "react";
import { Router, Switch } from "react-router-dom";
import history from "./History";
import Loader from "../components/Loader/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import * as LazyComponent from "../utils/Lazyloaded";
const Routes = (
  <Suspense fallback={<Loader />}>
    <Router history={history}>
      <Switch>
        {/* public route means that user is not authnticated */}
        <PublicRoute component={LazyComponent.Home} path="/" exact />
        <PublicRoute component={LazyComponent.Login} path="/Login" exact />
        <PublicRoute component={LazyComponent.Signup} path="/Signup" exact />
        {/* private route means that user is authnticated */}
        <PrivateRoute component={LazyComponent.Chat} path="/Chat" exact />
        <PrivateRoute component={LazyComponent.Chat} path="/Chat/:id" exact />
        <LazyComponent.NotFound path="**" exact />
      </Switch>
    </Router>
  </Suspense>
);
export default Routes;
