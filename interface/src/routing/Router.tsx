import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { IRoute } from "./config";
import { NotFound } from "../components";

interface IProps {
  routes: IRoute[];
}

const Router: React.FC<IProps> = ({ routes }) => {
  return (
    <BrowserRouter>
      <Switch>
        {routes &&
          routes.map((route: IRoute) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        <Route render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
