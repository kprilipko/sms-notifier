import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { IRoute } from './config';

interface IProps {
  routes: IRoute[];
}

const Router: React.FC<IProps> = ({ routes }) => {
  return <BrowserRouter><Switch>{routes && routes.map((route: IRoute) => <RouteWithSubRoutes key={route.path} {...route} />)}</Switch></BrowserRouter>
};

export default Router;