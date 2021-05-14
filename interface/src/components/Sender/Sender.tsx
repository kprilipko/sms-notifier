import { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";

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

export const Sender = () => {
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

  const onHandleChange = (event: {
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
        <InputLabel>Tel</InputLabel>
        <Input
          type="tel"
          name="to"
          value={state.message.to}
          onChange={onHandleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Msg</InputLabel>
        <Input
          name="body"
          value={state.message.body}
          onChange={onHandleChange}
        />
      </FormControl>
      <Button variant="contained" onClick={onSubmit} color="primary">
        Send
      </Button>
      <FormHelperText error>{state.error}</FormHelperText>
    </form>
    //   <form
    //   onSubmit={onSubmit}
    //   className={state.error ? 'error sms-form' : 'sms-form'}
    // >
    //   <div>
    //     <label htmlFor="to">To:</label>
    //     <input
    //       type="tel"
    //       name="to"
    //       id="to"
    //       value={state.message.to}
    //       onChange={onHandleChange}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="body">Body:</label>
    //     <textarea
    //       name="body"
    //       id="body"
    //       value={state.message.body}
    //       onChange={onHandleChange}
    //     />
    //   </div>
    //   <button type="submit" disabled={state.submitting}>
    //     Send message
    //   </button>
    // </form>
  );
};
