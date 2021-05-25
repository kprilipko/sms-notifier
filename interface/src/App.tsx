import React, { useContext, useEffect, useState } from "react";
import "./App.css";

import Router from "./routing/Router";
import { routes } from "./routing/config";
import Grid from "@material-ui/core/Grid";
import { PrimaryAppBar } from "./components";
import { AuthContext } from "./global/AuthContext";
import firebase from "firebase/app";

const App = () => {
  const authenticated = useContext(AuthContext);
  const [auth, setAuth] = useState<firebase.User | null>();

  useEffect(() => {
    setAuth(authenticated);
  }, [authenticated]);

  return (
    <>
      <PrimaryAppBar />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Router routes={routes} authenticated={!!auth} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
