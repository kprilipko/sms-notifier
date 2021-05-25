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
import { useHistory } from "react-router-dom";

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

export const SignUp: FC<RouteComponentProps> = () => {
  let history = useHistory();
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const createAccount = async () => {
    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      history.push("/sender");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrors((prevState) => ({ ...prevState, email: error.message }));
      } else setErrors((prevState) => ({ ...prevState, email: "" }));
      if (error.code === "auth/weak-password") {
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
        <Button onClick={createAccount} color="secondary">
          SignUp
        </Button>
      </ButtonGroup>
    </form>
  );
};
