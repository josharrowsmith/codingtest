import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { Button, Container } from "../components";
import { useQuery } from "react-query";
import { getUser } from "../utils/users"
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks";
import OrgAll from "./org/OrgALl";
import OrganisationCreateJoin from "./org/OrgCreateJoin";
import OrgHome from "./org/OrgHome";
import OrgShifts from "./org/OrgShifts";
import OrgEdit from "./org/OrgEdit";

export default function Organisation() {
  const history = useHistory();
  const { logout, user, token } = useAuth();
  const { data, error, isLoading, isError } = useQuery(["user", token], () => getUser(token));

  useEffect(() => {
    if (data) {
      if (data.organisationId == null || data.organisationId == undefined) {
        history.push('/organisation/list');
      } else {
        history.push({
          pathname: `/organisation/home`,
          state: data.organisationId
        });
      }
    }
  }, [data])

  if (error) return <h1>error</h1>

  if (isLoading) return <h1>loading</h1>


  return (
    <Container>
      <Switch>
        <Route exact component={OrganisationCreateJoin} path="/organisation/createjoin" />
        <Route exact component={OrgAll} path="/organisation/list" />
        <Route exact component={OrgHome} path="/organisation/home" />
        <Route exact component={OrgShifts} path="/organisation/shifts" />
        <Route exact component={OrgEdit} path="/organisation/edit" />
        <Route render={() => <Redirect to={{ pathname: "/organisation" }} />} />
      </Switch>
    </Container>
  );
}
