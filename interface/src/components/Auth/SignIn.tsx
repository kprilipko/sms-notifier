import React, { useState, useRef, FC } from "react";

import { RouteComponentProps } from "@reach/router";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import { auth } from "../../global/firebaseSetup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    btnsGrp: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export const SignIn: FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrors((prevState) => ({ ...prevState, email: error.message }));
      } else setErrors((prevState) => ({ ...prevState, email: "" }));
      if (error.code === "auth/wrong-password") {
        setErrors((prevState) => ({ ...prevState, password: error.message }));
      } else setErrors((prevState) => ({ ...prevState, password: "" }));
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <form className={classes.root}>
      <FormControl error={!!errors.email} variant="outlined">
        <InputLabel htmlFor="component-outlined">Email</InputLabel>
        <OutlinedInput inputRef={emailRef} type="email" label="Email" />
        <FormHelperText>{errors.email}</FormHelperText>
      </FormControl>
      <FormControl error={!!errors.password} variant="outlined">
        <InputLabel htmlFor="component-outlined">Password</InputLabel>
        <OutlinedInput
          inputRef={passwordRef}
          type="password"
          label="Password"
        />
        <FormHelperText>{errors.password}</FormHelperText>
      </FormControl>
      <ButtonGroup
        className={classes.btnsGrp}
        disableElevation
        variant="contained"
      >
        <Button onClick={signIn} color="primary">
          SignIn
        </Button>
      </ButtonGroup>
    </form>
  );
};
