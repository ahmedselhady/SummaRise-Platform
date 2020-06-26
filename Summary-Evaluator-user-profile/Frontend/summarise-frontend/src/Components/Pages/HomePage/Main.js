import React from "react";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import essay from '../../../essay.png';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import "./Main.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  essay: {
    // width: "50%",
    height: "70%",
    marginRight: "0px"
  }
}));

function MainPage(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>

        <Grid item xs={6} style={{ maxHeight: "80vh" }}>
          <Typography variant="h3" style={{ color: "white", paddingTop: "15%", paddingLeft: "5%", maxHeight: "80vh" }}> Document Summarization and Evaluation Platform  </Typography>

          <Divider style={{ background: "white", marginLeft: "5%", marginTop: "2.5%" }} />
          <Typography variant="h4" style={{ color: "white", paddingTop: "5%", paddingLeft: "6%" }}> Summarize Your Documents  </Typography>
          <Typography variant="h4" style={{ color: "white", paddingTop: "5%", paddingLeft: "6%" }}> Score Your Summary </Typography>
          <Typography variant="h4" style={{ color: "white", paddingTop: "5%", paddingLeft: "6%" }}> Compare Your Scores to Standards  </Typography>

        </Grid>
        <Grid item xs={6} style={{ height: "wrap", paddingLeft: "10%", maxHeight: "80vh" }}>
          <img src={essay} className={classes.essay} alt="logo" />

        </Grid>

      </Grid>
      <QuickAccessCard style={{



      }} />
    </div>

  );
}

export default MainPage;


const QuickAccessCardStyles = makeStyles({
  root: {
    width: "40%",
    position: "absolute",
    right: "30%",
    bottom: "2%",
    opacity: "0.8",
    background: "#1c2e4C"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    color: "white",
    textAlign: "center"
  },
  pos: {
    marginBottom: 12,
  },
});

function QuickAccessCard() {
  const classes = QuickAccessCardStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent style={{ padding: "5%" }}>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Get Started With SummaRise
        </Typography>


        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "4%" }}
        >
          <Divider style={{ background: "white", width: "45%", marginTop: "2%", marginRight: "1%" }} />
          <AcUnitIcon style={{color: "white"}}/>

          <Divider style={{ background: "white", width: "45%", marginTop: "2%", marginLeft: "1%"  }} />

        </div>

        <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", marginTop: "5%" }}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Try it  {" "}
            <Link to="/project/new" style={{ color: "white" }}>
              Now
          </Link>
            <br />

            or

            <br />
          Read more about {" "}

            <Link to="/project/new" style={{ color: "white" }}>
              SummaRise
          </Link>

          </Typography>
        </div>

        <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", marginTop: "5%" }}>

          <Divider style={{ background: "white" }} />


          <Divider style={{ color: "white", marginLeft: "5%", marginTop: "2.5%" }} />

        </div>

        {/* <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
  </Typography> */}
      </CardContent>
      {/* <CardActions>
        {/* <IconButton aria-label="add-project" style={{ color: "#1c2e4a", background: "#f5f5f5" }}>
          Try it Now  <WrapTextIcon />
        </IconButton> 

      </CardActions> */}
    </Card>
  );
}