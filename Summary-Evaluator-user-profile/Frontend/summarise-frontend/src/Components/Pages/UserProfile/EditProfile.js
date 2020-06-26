import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import EditIcon from "@material-ui/icons/Edit";
import FloatingActionButton from "../../Common/Button/FloatingButton";
import { makeStyles } from "@material-ui/core/styles";
import LetterAvatars from "../../Common/UserAvatar/Avatar";
import ExpansionPanelHolder from "../../Common/ExpansionPannel/ExpansionPannel";
import ProjectSummary from "../ProjectSummary/ProjectSummar";
import TextField from "@material-ui/core/TextField";
import CategorizedSelect from "../../Common/Dropdown/CategorizedSelectMenu";
import IconedButton from "../../Common/Button/Button";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TooltipButton from "../../Common/Button/Tooltip";
import ProgressSaveButton from '../../Common/Button/SaveButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#23395d",
    height: "70%"
  },
  margin: {
    margin: theme.spacing(1)
  },
  marginCorrect: {
    margin: theme.spacing(1),
    background: "orangered"
  },

  paper: {
    marginTop: "8%",
    margin: "auto",
    maxWidth: "40%",
    height: "60%"
  },
  image: {
    width: "100%",
    height: "100%",
    paddingRight: "70%"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  formroot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%"
    }
  },
  formlabels: {
    color: "#0076BD",
    fontFamily: "sans-sarif",
    fontSize: "1.2em"
  },
  formInput: {
    margin: "auto",
    padding: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%"
  },
  formInputButtons: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    padding: "auto",
    margin: "auto"
  }
}));

const dummyTitles = [
  {
    title: "summary 1"
  },
  {
    title: "summary 2"
  },
  {
    title: "summary 3"
  }
];

export default function EditUser(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <EditUserForm {...props} />
    </Paper>
  );
}

function EditUserForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.formroot}>
      <div
        className={classes.formInput}
        style={{
          paddingBottom: "5%"
        }}
      >
        <div></div>
        {/* <LetterAvatars initials="AS" variant="square"/> */}
        <h
          style={{
            fontFamily: "sans-serif",
            fontSize: "5em",
            //fontWeight: "bold",
            flex: 1,
            color: "skyblue",
            alignText: "center",
            margin: "auto"
          }}
        >
          {props.userName}
        </h>

        <h
          style={{
            fontFamily: "sans-serif",
            fontSize: "1em",
            //fontWeight: "bold",
            flex: 1,
            color: "skyblue",
            alignText: "center",
            margin: "auto"
          }}
        >
          {props.userEmail}
        </h>
      </div>

      <div
        className={classes.formInput}
        style={{
          paddingBottom: "5%"
        }}
      >
        <Divider light />
      </div>

      <div className={classes.formInput}>
        <div>
          <TextField
            required
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            placeholder="e.g. Paul"
            defaultValue={props.firstName}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            placeholder="e.g. Gregory"
            defaultValue={props.lastName}
          />
        </div>
      </div>

      <div className={classes.formInput}>
        <div>
          <TextField
            required
            id="outlined-basic"
            label="Current Affiliation"
            variant="outlined"
            placeholder="e.g. Senior Vice Presedent"
            defaultValue={props.affiliation}
          />
        </div>

        <div>
          <TextField
            required
            id="outlined-basic"
            label="Organization"
            variant="outlined"
            placeholder="e.g. Google"
            defaultValue={props.institute}
          />
        </div>
      </div>
      <div className={classes.formInputButtons}>
        <div />
        <IconButton aria-label="discard" className={classes.margin}>
          <CloseIcon />
        </IconButton>
        <ProgressSaveButton />
        {/* <IconButton aria-label="save" className={classes.marginCorrect}>
          <CheckIcon />
        </IconButton> */}
      </div>
    </form>
  );
}
