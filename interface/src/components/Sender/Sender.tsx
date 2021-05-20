import { useState, FC } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";

import { RouteComponentProps } from "@reach/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

export const Sender: FC<RouteComponentProps> = (): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = useState({
    message: {
      to: "",
      body: "",
    },
    submitting: false,
    error: "",
  });

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, submitting: true }));
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setState({
            error: "",
            submitting: false,
            message: {
              to: "",
              body: "",
            },
          });
        } else {
          setState((prevState) => ({
            ...prevState,
            error: "Wrong data",
            submitting: false,
          }));
        }
      });
  };

  const onHandleChangePhone = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      message: { ...state.message, ["to"]: value },
    }));
  };

  const onHandleChangeCommon = (event: {
    target: { getAttribute: (arg0: string) => any; value: any };
  }) => {
    const name = event.target.getAttribute("name");
    setState((prevState) => ({
      ...prevState,
      message: { ...state.message, [name]: event.target.value },
    }));
  };

  return (
    <form className={classes.root}>
      <FormControl>
        <PhoneInput value={state.message.to} onChange={onHandleChangePhone} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="SMS">SMS</InputLabel>
        <Input
          id="SMS"
          name="body"
          value={state.message.body}
          onChange={onHandleChangeCommon}
        />
      </FormControl>
      <Button variant="contained" onClick={onSubmit} color="primary">
        Send
      </Button>
      <FormHelperText error>{state.error}</FormHelperText>
    </form>
  );
};
