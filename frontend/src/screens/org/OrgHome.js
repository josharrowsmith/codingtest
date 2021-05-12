import React, { useEffect, useState } from "react";
import { Button, Container } from "../../components"
import { useQuery, useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom"
import { getOrg, leaveOrg } from "../../utils/organisations"
import { useAuth } from "../../hooks";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`


export default function OrgAll(props) {
    const { user, token } = useAuth();
    const history = useHistory();
    const id = props.location.state;
    const [org, setorg] = useState({})

    async function getOrgData() {
        const result = await getOrg(token, id)
        setorg(result)
    }

    useEffect(() => {
        getOrgData()
    }, []);

    const leaveHandler = async (id) => {
        const result = await leaveOrg(token)
        if (result == 200) {
            history.push("/");
        }
    }

    const shiftsHandler = async () => {
        history.push({
            pathname: `/organisation/shifts`,
            state: id
        });
    }

    const editOrg = async () => {
        history.push({
            pathname: `/organisation/edit`,
            state: id
        });
    }

    return (
        <>
            <h2>Logged in as : {user.name}</h2>
            <h1>{org.name}</h1>
            <Row>
                <Button onClick={() => shiftsHandler()}>View Shifts</Button>
                <Button onClick={() => editOrg()}>Edit</Button>
                <Button onClick={() => leaveHandler(org.id)}>Leave</Button>
            </Row>
        </>
    )
}

