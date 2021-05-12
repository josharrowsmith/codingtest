import React, { useEffect } from "react";
import { Button, Container } from "../../components"
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom"
import { getAllOrgs, joinOrg, editOrgs, leaveOrg } from "../../utils/organisations"
import { createBrowserHistory } from "history";
import { useAuth } from "../../hooks";
import styled from "styled-components";
import OrgCreateJoin from "./OrgCreateJoin"

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`


export default function OrgAll() {
    const history = useHistory();
    const { user, token } = useAuth();
    const { data, error, isLoading, isError } = useQuery(["organisation", token], () => getAllOrgs(token));
    const mutation = useMutation(data => editOrgs(data))


    if (error) return <h1>error</h1>

    if (isLoading) return <h1>loading</h1>

    const joinHandler = async (id) => {
        const result = await joinOrg(token, id)
        if (result == 200) {
            // i dont like this
            const historyBrowser = createBrowserHistory({
                basename: "organisation",
                forceRefresh: true,
            });
            historyBrowser.push('/organisation');
        }
    }

    const leaveHandler = async () => {
        const result = await leaveOrg(token)
        if (result == 200) {
            console.log("yes")
        }
    }

    return (
        <Container>
            <h1>Logged in as : {user.name}</h1>
            <h1>You aren't a memeber of any organisation</h1>
            <ul>
                {data.map((i) =>
                    <Row key={i.id}>
                        <li>{i.name}</li>
                        <Button onClick={() => history.push({
                            pathname: `/organisation/edit`,
                            state: i.id
                        })}>edit</Button>
                        <Button onClick={() => joinHandler(i.id)}>Join</Button>
                    </Row>
                )}
            </ul>
            <br></br>
            <OrgCreateJoin />
        </Container>

    );
}

