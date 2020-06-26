import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  avatar: {
    large: {
      width: "15%",
      height: "15%"
    }
  }
}));

export default function LetterAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        className={classes.avatar.large}
        style={{
          background: props.color,
          color: "theme.palette.getContrastText(deepOrange[500])"
        }}
        variant={props.variant}
      >
        {props.initials}
      </Avatar>
    </div>
  );
}
