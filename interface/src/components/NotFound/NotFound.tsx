import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "@reach/router";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const NotFound: FC<RouteComponentProps> = (): JSX.Element => {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          404
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Page Not Found
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link href="/sender">Sender</Link>
        </Button>
        <Button size="small" color="primary">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
