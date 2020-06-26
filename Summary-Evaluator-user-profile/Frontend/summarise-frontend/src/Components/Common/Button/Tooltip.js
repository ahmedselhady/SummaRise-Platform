import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

export default function TooltipButton(props) {
  const classes = useStyles();

  return (
    <Tooltip title={props.title} aria-label={props.label}>
      <Fab color="primary" className={classes.fab}>
        {props.children}
      </Fab>
    </Tooltip>
  );
}
