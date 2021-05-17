import React, { useContext, FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./global/AuthContext";
import { Sender } from "./components";
import { SignIn, SignUp } from "./components";

const routes = [
  {
    path: "/sender",
    component: <Sender />,
    name: "sender",
  },
  {
    path: "/signin",
    component: <SignIn />,
    name: "auth",
  },
];

export const Routing = () => {
  const user = useContext(AuthContext);

  const RouteWithSubRoutes = (route: {
    path: string;
    component: JSX.Element;
  }) => {
    return (
      <Switch>
        <Route
          exact
          path={route.path}
          render={() =>
            routes.filter((el) =>
              user ? el.name !== "auth" : el.name === "auth"
            )[0].component
          }
        />
      </Switch>
    );
  };

  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route exact path="/registration" render={() => <SignUp />} />
        <Route render={() => <Redirect to="/sender" />} />
      </Switch>
    </Router>
  );
};
