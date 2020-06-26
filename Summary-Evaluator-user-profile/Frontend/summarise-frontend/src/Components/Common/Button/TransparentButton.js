import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function TransparentButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        size="medium"
        className={classes.margin}
        style={{
          borderColor: "transparent",
          background: "transparent",
          color: props.textColor
        }}
      >
        {props.displayText}
      </Button>
    </div>
  );
}
