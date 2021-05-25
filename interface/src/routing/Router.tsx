import React, { lazy } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { IRoute } from "./config";
import { NotFound } from "../components";
import { Sender } from "../components/Sender";
import { SignUp } from "../components/Auth/SignUp";
import { SignIn } from "../components/Auth/SignIn";

interface IProps {
  routes: IRoute[];
  authenticated: boolean;
}

const Router: React.FC<IProps> = ({ authenticated }) => {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        {authenticated ? (
          <Route path="/sender" exact render={() => <Sender />} />
        ) : (
          <>
            <Route path="/signup" exact render={() => <SignUp />} />
            <Route path="/signin" exact render={() => <SignIn />} />
            <Route path="/sender" exact render={() => <NotFound />} />
          </>
        )}

        <Route render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
