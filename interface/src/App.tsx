import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import { Sender } from "./components";
import { SignIn } from "./components";
import { AuthContext } from "./global/AuthContext";
import Grid from "@material-ui/core/Grid";

const App = () => {
  const user = useContext(AuthContext);
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        {user ? (
          <Sender />
        ) : (
          <Router>
            <SignIn path="/" />
          </Router>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
