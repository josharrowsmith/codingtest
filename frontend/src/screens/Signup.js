import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Label, Input } from "../components";
import { useAuth } from "../hooks";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { signup, isAuth } = useAuth();

  // pass the key
  const onSubmit = data => {
    console.log(data)
    signup({
      ...data
    });
  };

  const goToLogin = () => {
    history.push("/login")
  }

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);


  console.log(errors)
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <Label>Name</Label>
        <Input
          label="Name"
          name="name"
          {...register("name")}
        />
        <Label>Email</Label>
        <Input
          label="Email"
          name="email"
          {...register("email")}
        />
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          {...register("password",{
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          })}
        />
        {errors && <p>{errors.password.message}</p>}
        <Label>Password confirm</Label>
        <Input
          name="passwordConfirmation"
          type="password"
          {...register("passwordConfirmation",{
            validate: value =>
              value === password.current || "The passwords do not match"
          })}
        />
        {errors && <p>{errors.passwordConfirmation.message}</p>}
        <Button
          variant="contained"
          color="primary"
          mt={2}
          type="submit"
        >
          Sign Up
            </Button>
        <Button onClick={goToLogin}>Login</Button>
      </Form>

    </Container>
  );
}
