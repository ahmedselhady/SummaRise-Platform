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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: "12%",
    margin: "auto",
    maxWidth: "90%"
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
]

export default function ProfileView(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={3} style={{ padding: "2%" }}>
          <Grid item>
            <Typography variant="subtitle1">
              <LetterAvatars color="#F05E23" initials="AS" />
            </Typography>
          </Grid>
          <Grid item>
            <ButtonBase className={classes.image}></ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ fontSize: "1.5em", fontWeight: "bold" }}
                >
                  {props.userName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {props.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ color: "black" }}
                >
                  {props.affiliation} at {props.institute}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.userEmail}
                </Typography>

                <Grid container spacing={2} style={{ marginTop: "1%" }}>
                  <ExpansionPanelHolder title="My Projects" projectsTitles={ dummyTitles}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                <FloatingActionButton>
                  <EditIcon />
                </FloatingActionButton>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
