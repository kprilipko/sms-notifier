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
import { connect } from 'react-redux';
import { addSMS } from '../../state/actionCreators'
import axios from 'axios';

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

export const Sender: FC<RouteComponentProps & any> = ({onAddSMS}): JSX.Element => {
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
    axios("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(state.message),
    })
      .then((res) => {
        if (res.data.success) {
          setState({
            error: "",
            submitting: false,
            message: {
              to: "",
              body: "",
            },
          });
          onAddSMS(state.message)
        } else {
          setState((prevState) => ({
            ...prevState,
            error: "Wrong data",
            submitting: false,
          }));
        }
      })
      .catch(err => {
        setState((prevState) => ({
          ...prevState,
          error: err,
          submitting: false,
        }));
      })
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

const mapDispatchToProps = (dispatch: (arg0: SMSAction) => any, data: ISMS) => {
  return {
    onAddSMS: () => dispatch(addSMS(data)),
  };
};


export default connect(
  null,
  mapDispatchToProps
)(Sender);