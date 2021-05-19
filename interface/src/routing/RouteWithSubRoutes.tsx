import React, { Suspense, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from './config';
import { AuthContext } from "../global/AuthContext";

const RouteWithSubRoutes = (route: IRoute) => {
// const authenticated = useContext(AuthContext);
const authenticated = true

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props) =>
          route.redirect ? <Redirect to={route.redirect}/> :
            route.private ? (
              authenticated ? route.component &&
                <route.component {...props} /> : <Redirect to='/signin'/>
            ) : (route.component ? <route.component {...props} /> : <Redirect to='/sender'/>)
        }
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;