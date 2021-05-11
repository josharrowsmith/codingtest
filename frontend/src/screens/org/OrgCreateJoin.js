import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useMutation } from "react-query"
import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks";
import { Button, Form, Label, Input, Box } from "../../components"
import { createOrgs } from "../../utils/organisations"
import { useHistory } from "react-router-dom";
import styled from "styled-components"

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  justify-content: center;
`;

export default function OrgCreateJoin() {
  const history = useHistory();
  const { user, token } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const mutation = useMutation(data => createOrgs(data))

  const onSubmit = async data => {
    const result = await mutation.mutateAsync({
      ...data,
      token
    });
    if (result == 200) {
      history.push("/");
    }

  };


  return (
    <>
      <h1>Create Organisation</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Label> Name</Label>
          <Input
            label="Name"
            name="name"
            {...register("name")}
          />
        </FormContainer>
        <FormContainer>
          <Label>Hourly Rate</Label>
          <Input
            label="rate"
            name="rate"
            {...register("rate")}
          />
        </FormContainer>
        <Button type="submit">Create and Join</Button>
      </Form>
    </>
  )
}

