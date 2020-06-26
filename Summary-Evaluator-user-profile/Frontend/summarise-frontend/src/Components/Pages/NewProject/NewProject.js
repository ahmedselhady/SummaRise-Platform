import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DocumentBar from './DocumentBar';
import SummaryBar from './SummaryBar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    absolute: {
        position: 'relative',
        bottom: "50px",
        right: "10px",
    },
}));

export default function NewProject(props) {
    const classes = useStyles();
    const timerRef = React.useRef();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const handleGrenrateSummary = () => {
        //setLoading(true)
    };

    const handleEvaluateSummary = () => {
       // setLoading(false)
    };


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                {/* original document */}

                <Grid item xs={12} sm={6}>

                    <Paper className={classes.paper}>

                        <DocumentBar />
                        {/* {loading ? <LinearProgress color="secondary" /> : null} */}
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1"
                        }}>
                            <Typography variant="h6" >
                                words |
                            </Typography>
                            <Typography variant="h6" >
                                sentences |
                            </Typography>
                            <Typography variant="h6" >
                                words per sentences |
                            </Typography>
                            <Typography variant="h6" >
                                dale-chall score |
                            </Typography>
                            <Typography variant="h6" >
                                flesh reading ease
                            </Typography>
                        </div>

                        <textarea style={{ width: "98%", minHeight: "70vh", margin: "1%" }} />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1",
                            paddingBottom: "1%"
                        }}>
                            <Alert severity="error">This is an error alert — check it out!</Alert>
                            <Alert severity="warning">This is a warning alert — check it out!</Alert>
                            <Alert severity="info">This is an info alert — check it out!</Alert>
                        </div>
                    </Paper>
                </Grid>

                {/* summary */}

                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <SummaryBar onGenerateSummary={handleGrenrateSummary} onEvaluateSummary={handleEvaluateSummary} />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1"
                        }}>
                            <Typography variant="h6" >
                                words |
                            </Typography>
                            <Typography variant="h6" >
                                sentences |
                            </Typography>
                            <Typography variant="h6" >
                                words per sentences |
                            </Typography>
                            <Typography variant="h6" >
                                dale-chall score |
                            </Typography>
                            <Typography variant="h6" >
                                flesh reading ease
                            </Typography>
                        </div>

                        <textarea style={{ width: "98%", minHeight: "70vh", margin: "1%" }} />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1",
                            paddingBottom: "1%"
                        }}>
                            <Alert severity="error">This is an error alert — check it out!</Alert>
                            <Alert severity="warning">This is a warning alert — check it out!</Alert>
                            <Alert severity="info">This is an info alert — check it out!</Alert>
                        </div>

                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

