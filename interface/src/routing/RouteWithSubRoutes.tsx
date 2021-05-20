import React, { Suspense, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { IRoute } from "./config";
import { AuthContext } from "../global/AuthContext";

const RouteWithSubRoutes = (route: IRoute) => {
  // const authenticated = useContext(AuthContext);
  const authenticated = false;

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          authenticated ? (
            route.component && route.private ? (
              <route.component {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          ) : route.component && !route.private ? (
            <route.component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
