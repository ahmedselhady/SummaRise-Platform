import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: "1"
    },
    button: {
        margin: theme.spacing(1),
    },
}));


export default function DocumentBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Toolbar style={{ background: "#1c2e4a", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "0px" }}>

                <Button
                    className={classes.button}
                    startIcon={<PublishIcon />}
                    style={{
                        background: "orangered",
                        color: "white",
                        fontSize: "1.3em",
                        fontWeight: "bold"

                    }}
                    size="Large"                 >
                    Upload document
      </Button>

                <IconButton aria-label="delete" style={{ color: "white" }} >
                    <DeleteOutlinedIcon onClick={props.setDocument("")}/>
                </IconButton>
            </Toolbar>

        </div>
    );
}