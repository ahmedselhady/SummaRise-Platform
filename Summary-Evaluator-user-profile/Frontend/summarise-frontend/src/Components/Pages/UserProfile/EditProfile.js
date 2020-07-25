import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    // marginTop: "1%",
    maxWidth: 700,
  },
  media: {
    height: "50%",
    width: "50%",
    padding: "2%",
    borderRadius: "50%",
    background: "#23395d"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function EditUSer(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [redirect, setRedirect] = React.useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/user/' />
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.userName}
        subheader={props.userEmail}
        style={{
          textAlign: "center",
          color: "#23395d",
          fontSize: "1.2em"
        }}
      />
      <CardContent>


        <Typography variant="h5"
          style={{
            marginTop: "2%",
            paddingTop: "2px",
            marginLeft: "5%"
          }}>
          Personal Data:
          </Typography>



        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "1%",
          marginLeft: "15%",
          marginRight: "15%",
          marginBottom: "5%"
        }}>

          <TextField
            style={{
              marginTop: "3%"
            }}
            required
            id="filled-required"
            label="First Name"
            placeholder="Selena"
            variant="filled"
            defaultValue={props.firstName}

          />

          <TextField
            style={{
              marginTop: "3%"
            }}
            id="filled-required"
            label="Last Name"
            placeholder="Harper"
            variant="filled"
            defaultValue={props.lastName}

          />

          <TextField
            style={{
              marginTop: "3%"
            }}
            required
            id="filled-required"
            label="Current Affiliation"
            placeholder="Software Developer"
            variant="filled"
            defaultValue={props.affiliation}

          />

          <TextField
            style={{
              marginTop: "3%"
            }}
            required
            id="filled-required"
            label="Organization"
            placeholder="Google"
            variant="filled"
            defaultValue={props.institute}
          />
        </div>


        <Divider />

        <Typography variant="h5"
          style={{
            marginTop: "2%",
            paddingTop: "2px",
            marginLeft: "5%"
          }}>
          Change Password:
          </Typography>

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "1%",
          marginLeft: "15%",
          marginRight: "15%",
          marginBottom: "5%"
        }}>

          <TextField
            style={{
              marginTop: "3%"
            }}
            id="filled-required"
            label="New Password"
            variant="filled"
            type="password"
          />

          <TextField
            style={{
              marginTop: "3%"
            }}
            id="filled-required"
            label="Confirm New Password"
            variant="filled"
            type="password"
          />

        </div>



        <Divider />


        <Typography variant="h5"
          style={{
            marginTop: "2%",
            paddingTop: "2px",
            marginLeft: "5%"
          }}>
          Confirm You Password:
          </Typography>

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "1%",
          marginLeft: "15%",
          marginRight: "15%",
          marginBottom: "5%"
        }}>
          <TextField
            style={{
              marginTop: "3%"
            }}
            required
            id="filled-required"
            label="Current Password"
            variant="filled"
            type="password"
          />

        </div>



      </CardContent>
      <CardActions style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "5%",
        marginLeft: "5%",
        marginRight: "5%",


      }} >

        {renderRedirect()}
        <Button variant="contained" style={{
          width: "90%",
          padding: "2%",
          background: "#D3D3D3",
          color: "#23395d"
        }}
        
        onClick = {()=>{ setRedirect(true) }}
        >
         
            Cancel
          

        </Button>

        <Button variant="contained" style={{
          width: "90%",
          padding: "2%",
          background: "#23395d",
          color: "white"
        }}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
