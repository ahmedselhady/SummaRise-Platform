import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import logo from '../../../pen1.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import { BASE_URL } from '../../../Services/Common';
import { POST, GET } from '../../../Services/HttpHandlers';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    // marginTop: "5%",
    maxWidth: 500,
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

export default function LoginCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(undefined);
  const [userPass, setUserPass] = React.useState(undefined);
  const [redirect, setRedirect] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getUserProjects = () => {

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      "email": userEmail,
      "password": userPass
    }

    POST(BASE_URL, 'sign_in', userData)
      .then(response => (!response.ok ? undefined : response.json()))
      .then(response_message => {
        const message = response_message.message;
        if (message == undefined) {
          console.log('elhamdulelah: ', response_message.token);
          // TODO: Load his projects
          setRedirect(true);
          return response_message.token;
        } else {
          alert(message);
          return undefined;
        }
      }
      ).then(token => {
        if (token) {
          props.setToken(token);
          console.log('done')
          return token;
        }

        return undefined;

      }).then((token) => {
        if (token) {
          GET(BASE_URL, 'user', token)
            .then(response => (!response.ok ? undefined : response.json()))
            .then(response => props.setUserData(response));

        }
      }).catch(error => alert('Could Not Register! Please Check Your Internet Connection and Try Again'));


  }

  return (
    <form onSubmit={handleSubmit}>

      {renderRedirect()}

      <Card className={classes.root}>
        <CardHeader
          title="Login"
          style={{
            textAlign: "center",
            color: "#23395d"
          }}
        />
        <CardContent>

          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}>
            <img src={logo} alt="logo" className={classes.media} />

          </div>


          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "5%"
          }}>

            <TextField
              required
              id="filled-required"
              label="User Email"
              placeholder="someone@example.org"
              variant="filled"
              onChange={event => setUserEmail(event.target.value)}
            />

            <TextField
              style={{
                marginTop: "5%"
              }}
              required
              id="filled-required"
              label="Required"
              type="password"
              label="Password"
              variant="filled"
              onChange={event => setUserPass(event.target.value)}

            />
          </div>



        </CardContent>
        <CardActions style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "5%"
        }} >
          <Button variant="contained" style={{
            width: "90%",
            padding: "2%",
            // backgroung: 
            background: "#23395d",
            color: "white"

          }}
            type="submit"

          >
            Login
        </Button>

          <Typography paragraph
            style={{
              marginTop: "2%",
              paddingTop: "2px"
            }}>
            Not Registered Yet?


            <Link to="/user/new" style={{
              textDecoration: "None",
              paddingLeft: "5px",
              color: "orangered",
              fontWeight: "bold"
            }}>
              Create New Account
              </Link>
          </Typography>

        </CardActions>
      </Card>
    </form>

  );
}
