import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Login, Organisation, Signup } from "../screens";
import { Layout } from "../components";
import { useAuth } from "../hooks";

const PrivateRoute = ({ component: Component, isAuth, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        isAuth ? <Component {...innerProps} /> : <Redirect to="/login" />
      }
    />
  );
};

export default function Routes() {
  const { isAuth } = useAuth();

  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/">
            {isAuth ? <Redirect to="/organisation" /> : <Redirect to="/login" />}
          </Route>
          <PrivateRoute path="/organisation" component={Organisation} isAuth={isAuth} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}
