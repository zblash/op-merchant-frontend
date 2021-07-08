import React from "react";
import { Switch, Route, Redirect } from "react-router";

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
}

const LoginPage = React.lazy(() =>
  import("./out-pages/login").then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = React.lazy(() =>
  import("./out-pages/register").then((module) => ({
    default: module.RegisterPage,
  }))
);
const routes: IRoute[] = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];
const OutRouter = React.memo(() => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact
          />
        ))}
        <Redirect from="*" to="/login" />
      </Switch>
    </React.Suspense>
  );
});

export default OutRouter;
