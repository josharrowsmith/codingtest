import React, { useEffect, useState } from "react";
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks";
import { Button, Form, Label, Input, Box } from "../../components"
import { editOrgs, getOrg } from "../../utils/organisations"
import { useHistory } from "react-router-dom";
import styled from "styled-components"

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  justify-content: center;
`;

export default function OrgEdit(props) {
    const history = useHistory();
    const { user, token } = useAuth();
    const { register, handleSubmit, errors } = useForm();
    const mutation = useMutation(data => editOrgs(data))
    const id = props.location.state;
    const [org, setorg] = useState({})
    

    const onSubmit = async data => {
        const result = await mutation.mutateAsync({
            ...data,
            token,
            id
        });
        if (result == 200) {
            history.push("/");
        }
    };

    async function getOrgData() {
        const result = await getOrg(token, id)
        setorg(result)
    }

    useEffect(() => {
        getOrgData()
    }, []);


    return (
        <>
            <h1>Edit Organisation</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                    <Label> Name</Label>
                    <Input
                        label="Name"
                        name="name"
                        placeholder={org.name}
                        {...register("name")}
                    />
                </FormContainer>
                <FormContainer>
                    <Label>Hourly Rate</Label>
                    <Input
                        label="rate"
                        name="rate"
                        placeholder={org.hourlyRate}
                        {...register("rate")}
                    />
                </FormContainer>
                <Button type="submit">Create and Join</Button>
            </Form>
        </>
    )
}

