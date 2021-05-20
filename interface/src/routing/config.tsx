import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  ReactNode,
} from "react";

export interface IRoute {
  path: string;
  exact: boolean;
  fallback: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: IRoute[];
  redirect?: string;
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/signup",
    component: lazy(() =>
      import("../components/Auth/SignUp").then((module) => ({
        default: module.SignUp,
      }))
    ),
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/signin",
    component: lazy(() =>
      import("../components/Auth/SignIn").then((module) => ({
        default: module.SignIn,
      }))
    ),
    exact: true,
    private: false,
    fallback: <div> Loading... </div>,
  },
  {
    path: "/sender",
    component: lazy(() =>
      import("../components/Sender").then((module) => ({
        default: module.Sender,
      }))
    ),
    exact: true,
    private: true,
    fallback: <div> Loading... </div>,
  },
];
