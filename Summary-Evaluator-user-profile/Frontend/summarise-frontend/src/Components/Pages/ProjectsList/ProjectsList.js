import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";



const dummy_projects_list = [

    {
        project_name: "project summary 1",
        project_date: "02/05/2020"
    },
    {
        project_name: "project summary 2",
        project_date: "02/05/2019"
    },
    {
        project_name: "project summary 3",
        project_date: "02/05/2018"
    },
    {
        project_name: "project summary 4",
        project_date: "24/05/2020"
    },

]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "2%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    toolbar: {
        background: "#1c2e4a",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px"
    }
}));

export default function ProjectsList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h4" style={{ color: "white" }}>
                            My Projects
                        </Typography>

                        <Link to="/project/new" style={{ textDecoration: "None", color: "#212121" }}>
                            <IconButton aria-label="add-project" style={{ background: "#23395d", color: "#F5F5F5" }} >
                                <PlaylistAddIcon />
                            </IconButton>
                        </Link>
                    </Toolbar>

                    <Paper className={classes.paper}>


                        {dummy_projects_list.map((value, idx) => (
                            idx == dummy_projects_list.length - 1 ? (
                                <ProjectListItem
                                    key={idx}
                                    project_name={value.project_name}
                                    project_date={value.project_date}
                                />
                            ) : (
                                    <div
                                        key={idx}
                                    >

                                        <ProjectListItem
                                            project_name={value.project_name}
                                            project_date={value.project_date}
                                        />
                                        <Divider />
                                    </div>

                                )
                        ))
                        }
                    </Paper>

                </Grid>
            </Grid>
        </div>
    );
}


const itenStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: "0.4%",
        paddingTop: "0.4%"

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function ProjectListItem(props) {

    const classes = itenStyles();

    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={2}>
                    <Typography variant="h5" style={{ color: "#1c2e4a" }}>
                        {props.project_name}
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={9}>
                    <Typography variant="h6" style={{ color: "#1c2e4a" }}>
                        {props.project_date}
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={1}>
                    <IconButton aria-label="add-project" style={{ color: "#1c2e4a", background: "#f5f5f5", marginRight: "2%" }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="add-project" style={{ color: "#1c2e4a", background: "#f5f5f5" }}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Grid>

            </Grid>
        </div>

    );


}