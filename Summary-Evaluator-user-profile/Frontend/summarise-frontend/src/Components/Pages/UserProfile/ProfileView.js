import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import logo from '../../../avatar.png';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    // marginTop: "5%",
    maxWidth: 500,
    background: "#F5F5F5"
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
    backgroundColor: "white",
    width: "50%",
    height: "50%",
    margin: "auto",
    borderRadius: "50%",
    marginTop: "3%"
  },
}));

export default function ProfileView(props) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Card className={classes.root}>
      <CardHeader

        avatar={
          null
        }

        title={props.userName}
        subheader={props.isVerified ? "verified user" : "please verify your email"}
        style={{
          textAlign: "center",
          color: "#23395d"
        }}

        action={
          <IconButton aria-label="settings"
          style={{
            background:  "white"//"#23395d",
          }}
          >
            <Link to="/user/edit" style={{
              textDecoration: "None", paddingLeft: "5px",
              fontWeight: "bold",
              color: "#23395d",
              paddingTop: "2%",
              paddingRight: "2%"
            }}>

              <EditIcon />
            </Link>
          </IconButton>
        }

      />

      <CardContent>

        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "1%"
        }}>

          {/* <Avatar aria-label="recipe" className={classes.avatar}
            variant="square">
            {props.userName[0].toUpperCase()}
          </Avatar> */}
          <Divider />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "1%",
              background: "#23395d",
              width: "100%"
            }}
          >


            <img src={logo} alt="logo" className={classes.avatar} />

            <Typography vparagraph
              style={{
                paddingTop: "2px",
                margin: "auto",
                marginBottom: "3%",
                color: "white"
              }}>
              {props.userEmail}
            </Typography>

          </div>

          <Divider />

          <Typography vparagraph
            style={{
              paddingTop: "2px",
              margin: "auto",
              marginTop: "3%",

            }}>
            <span

              style={{
                fontWeight: "bold",
                color: "#23395d",
                fontSize: "1.1em",
                fontWeight: "bold"
              }}
            >
              {"Full Name: "}
            </span>
            {props.fullName}
          </Typography>

          <Typography paragraph
            style={{
              marginTop: "2%",
              paddingTop: "2px",
              margin: "auto"

            }}>
            <span

              style={{
                fontWeight: "bold",
                color: "#23395d",
                fontSize: "1.1em"
              }}
            >
              {"Affiliation: "}
            </span>
            {props.affiliation}
          </Typography>

          <Typography paragraph
            style={{
              margin: "auto"

            }}>
            <span

              style={{
                fontWeight: "bold",
                color: "#23395d",
                fontSize: "1.1em"
              }}
            >
              {"Institute: "}
            </span>
            {props.institute}

          </Typography>

        </div>



      </CardContent>

    </Card >
  );
}
