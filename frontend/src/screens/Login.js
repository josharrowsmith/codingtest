import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Label, Input } from "../components";
import { useAuth } from "../hooks";
import { useHistory } from "react-router-dom";


export default function Login() {
  const history = useHistory();
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { login, isLoading, isAuth, error } = useAuth();

  // unsure why react query isnt working
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


  if(isLoading) {
    return <h1>loading</h1>
  }

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
        {errors.email && "username or email is required"}
        <Label>Password</Label>
        <Input
          label="Password"
          name="password"
          type="password"
          {...register("password", {
            required: "Required",
          })}
        />
         {errors.password && "password is required"}
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
        {error && (
          <p>{error}</p>
        )}
      </Form>
    </Container>
  );
}
