import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import HttpIcon from '@material-ui/icons/Http';
import AccountCircle from '@material-ui/icons/AccountCircle';

import logo from '../../../pen.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#23395d",

    },
    appBarGrid: {

        flexGrow: 1,

    },

    appLogo: {
        width: "9%",
        height: "9%",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function ApplicationDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/user/login' />
        }
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        props.setToken(undefined);

        setRedirect(true);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            {renderRedirect()}

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Grid container className={classes.appBarGrid} spacing={10}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={7}>
                                <Grid item xs={3}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "centre",
                                            flexGrow: "1"
                                        }}>
                                        <img src={logo} className={classes.appLogo} alt="logo" />

                                        <Link to="/" style={{ textDecoration: "None", color: "white" }}>
                                            <Typography variant="h4" style={{
                                                paddingTop: "1%",
                                                paddingLeft: "5%"
                                            }}> SummaRise </Typography>
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>

                                {props.token == undefined ?
                                    <Grid item xs={3}>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "0.5%" }}>
                                            <Link to="/user/new" style={{ textDecoration: "None" }}>
                                                <Button variant="outlined" style={{ color: "white", borderColor: "white" }}>Register</Button>
                                            </Link>
                                            <Link to="/user/login" style={{ textDecoration: "None" }}>
                                                <Button variant="outlined" style={{ color: "white", borderColor: "white", marginLeft: "25%" }}>LogIn </Button>
                                            </Link>
                                        </div>

                                    </Grid>
                                    :
                                    <Grid item xs={3}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "0.5%" }}>
                                            <Button variant="outlined" style={{ color: "#23395d", borderColor: "#23395d" }} disabled>Register</Button>
                                            <Button variant="outlined" style={{ color: "#23395d", borderColor: "#23395d", marginLeft: "25%" }} disabled>LogIn </Button>
                                    </div>

                                </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/project/new" style={{ textDecoration: "None", color: "#212121" }}>
                        <ListItem button key={0}>
                            <ListItemIcon> <PlaylistAddIcon /></ListItemIcon>
                            <ListItemText primary={"New Project"} />
                        </ListItem>
                    </Link>

                    {props.token != undefined ?

                        <Link to="/project/all" style={{ textDecoration: "None", color: "#212121" }}>
                            <ListItem button key={1}>
                                <ListItemIcon> <FormatListNumberedIcon /></ListItemIcon>
                                <ListItemText primary={"My Projects"} />
                            </ListItem>
                        </Link> : null}



                </List>

                <Divider />
                <List>
                    <Link to="/help/get-started" style={{ textDecoration: "None", color: "#212121" }}>
                        <ListItem button key={0}>
                            <ListItemIcon> <LiveHelpIcon /></ListItemIcon>
                            <ListItemText primary={"Help"} />
                        </ListItem>
                    </Link>

                    <Link to="/help/collaborate" style={{ textDecoration: "None", color: "#212121" }}>
                        <ListItem button key={1}>
                            <ListItemIcon> <GroupWorkIcon /></ListItemIcon>
                            <ListItemText primary={"Collaborate With Us"} />
                        </ListItem>
                    </Link>

                    <Link to="/help/apis" style={{ textDecoration: "None", color: "#212121" }}>
                        <ListItem button key={2}>
                            <ListItemIcon> <HttpIcon /></ListItemIcon>
                            <ListItemText primary={"Open APIs"} />
                        </ListItem>
                    </Link>

                </List>

                <Divider />

                {props.token != undefined ?

                    <Link to="/user/" style={{ textDecoration: "None", color: "#212121" }}>
                        <ListItem button key={1}>
                            <ListItemIcon> <AccountCircle /></ListItemIcon>
                            <ListItemText primary={"My Profile"} />
                        </ListItem>
                    </Link> : null}

                <List>
                    {props.token == undefined ?

                        <Link to="/user/login" style={{ textDecoration: "None", color: "#212121" }}>
                            <ListItem button key={0}>
                                <ListItemIcon> <ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary={"Log-in"} />
                            </ListItem>
                        </Link> : null}

                    {props.token != undefined ?

                        <ListItem button key={0} >
                            <ListItemIcon onClick={(e) => props.setToken(undefined)}> <ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary={"Log-out"} onClick={(e) => props.setToken(undefined)} />
                        </ListItem>
                        : null}

                </List>


            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}