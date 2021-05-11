import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Label, Input } from "../components";
import { useAuth } from "../hooks";
import { useHistory } from "react-router-dom";


export default function Login() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const { login, isLoading, isAuth } = useAuth();

  // need to pass key
  const onSubmit = data => {
    login({
      ...data
    });
  };

  const goToSignup = () => {
    history.push("/signup")
  }

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Log in</h1>
        <Label>Email</Label>
        <Input
          label="Email"
          name="email"
          {...register("email", {
            required: "Required",
          })}
        />
        <Label>Password</Label>
        <Input
          label="Password"
          name="password"
          type="password"
          {...register("password", {
            required: "Required",
          })}
        />
        <Button
          variant="contained"
          color="primary"
          mt={2}
          disabled={isLoading}
          loading={isLoading}
          type="submit"
        >
          Login
            </Button>
        <Button onClick={goToSignup}>Sign Up</Button>
      </Form>

    </Container>
  );
}
