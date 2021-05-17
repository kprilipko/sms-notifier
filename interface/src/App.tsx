import "./App.css";

import { Routing } from "./Routing";
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
        <Routing />
      </Grid>
    </Grid>
  );
};

export default App;
