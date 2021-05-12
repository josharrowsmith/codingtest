import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Label, Input } from "../components";
import { useAuth } from "../hooks";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
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
          {...register("name", {
            required: "You must specify a Name",
            minLength: {
              value: 3,
              message: "name must have at least 3 characters"
            }
          })}
        />
        {errors.name && errors.name.message}
        <Label>Email</Label>
        <Input
          label="Email"
          name="email"
          {...register("email", {
            required: "You must specify a Email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />
        {errors.email && errors.email.message}
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          })}
        />
        {errors.password && "password is required"}
        <Label>Password confirm</Label>
        <Input
          name="passwordConfirmation"
          type="password"
          {...register("passwordConfirmation", {
            validate: value =>
              value === password.current || "The passwords do not match"
          })}
        />
        {errors.passwordConfirmation && errors.passwordConfirmation.message}
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
