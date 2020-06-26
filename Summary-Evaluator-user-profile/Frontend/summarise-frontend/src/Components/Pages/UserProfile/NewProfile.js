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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#23395d",
    height: "70%"
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
    paddingTop: "2%",
    paddingLeft: "5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "90%"
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

export default function NewUser(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <NewUserForm />
    </Paper>
  );
}

function NewUserForm(props) {
  const classes = useStyles();

  return (
    <form className={classes.formroot}>
      <div
        className={classes.formInput}
        style={{
          paddingBottom: "5%"
        }}
      >
        <h
          style={{
            fontFamily: "sans-serif",
            fontSize: "5em",
            //fontWeight: "bold",
            flex: 1,
            color: "skyblue",
            alignText: "center",
            marginLeft: "20%",
            marginTop: "5%"
          }}
        >
          Register
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
        <TextField
          required
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          placeholder="e.g. pGregor99"
        />
      </div>

      <div className={classes.formInput}>
        <div>
          <TextField
            required
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            placeholder="e.g. Paul"
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            placeholder="e.g. Gregory"
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
          />
        </div>

        <div>
          <TextField
            required
            id="outlined-basic"
            label="Organization"
            variant="outlined"
            placeholder="e.g. Google"
          />
        </div>
      </div>
      <div className={classes.formInput}>
        <IconedButton
          displayText="Let's Get Started"
          iconType="send"
          backgroundColor="orangered"
          textColor="white"
          floatDirection="right"
          widthPercentage="10%"
          selfAllignment="center"
        />
      </div>
    </form>
  );
}
