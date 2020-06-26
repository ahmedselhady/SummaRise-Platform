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

export default function ButtonSizes(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        size="medium"
        color="primary"
        className={classes.margin}
        style={{
          borderColor: props.borderColor,
          background: props.backgroundColor,
          color: props.textColor
        }}
      >
        {props.displayText}
      </Button>
    </div>
  );
}
