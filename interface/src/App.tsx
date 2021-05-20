import "./App.css";

import Router from "./routing/Router";
import { routes } from "./routing/config";
import Grid from "@material-ui/core/Grid";

const App = () => {
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
        <Router routes={routes} />
      </Grid>
    </Grid>
  );
};

export default App;
