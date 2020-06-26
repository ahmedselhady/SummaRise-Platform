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
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp'; 
import LoopIcon from '@material-ui/icons/Loop'; 
import BallotIcon from '@material-ui/icons/Ballot'; 


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: "1"
    },
    button: {
        margin: theme.spacing(1),
    },
}));


export default function SummaryBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Toolbar style={{ background: "#1c2e4a", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                <div>

                    <Button
                        className={classes.button}
                        startIcon={<LoopIcon />}
                        style={{
                            background: "orangered",
                            color: "white",
                            fontSize: "1.2em",
                            fontWeight: "bold"
                        }}
                        size="small"
                        onClick = {props.onGenerateSummary}

                    >
                        Generate Summary
                    </Button>

                    <Button
                        className={classes.button}
                        startIcon={<BallotIcon />}
                        style={{
                            background: "orangered",
                            color: "white",
                            fontSize: "1.2em",
                            fontWeight: "bold"

                        }}
                        size="small"
                        onClick = {props.onEvaluateSummary}
                    >
                        Evaluate Summary
                    </Button>
                </div>



                <div>
                    <IconButton aria-label="delete" style={{ color: "white" }}>
                        <SaveIcon />
                    </IconButton>
                    <IconButton aria-label="delete" style={{ color: "white" }}>
                        <GetAppIcon />
                    </IconButton>
                </div>

            </Toolbar>

        </div>
    );
}