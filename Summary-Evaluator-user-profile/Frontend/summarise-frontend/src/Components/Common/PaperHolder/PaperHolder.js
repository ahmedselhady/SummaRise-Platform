import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
      height: "wrap"
    },
    paddingTop: "10%",
    paddingLeft: "5%"
  }
}));

export default function PaperHolder(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        {props.children}
      </Paper>
    </div>
  );
}
