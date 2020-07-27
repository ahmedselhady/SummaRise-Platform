import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function LinearIndeterminate() {
    const classes = useStyles();
    const [showProgress, setShowProgress] = React.useState(false);

    return (
        <div>


            {showProgress ?
                <div className={classes.root}>

                    {/* <LinearProgress color="secondary" /> */}
                    {/* <LinearProgress /> */}
                    <LinearProgress />
                    <LinearProgress color="secondary" />
                </div>
                : null
            }


            <Button
                // className={classes.button}
                // startIcon={<Pub <Button
                //     className={classes.button}
                //     startIcon={<PublishIcon />}
                //     style={{
                //         background: "orangered",
                //         color: "white",
                //         fontSize: "1.3em",
                //         fontWeight: "bold"

                //     }}
                size="Large"           
                onClick = {()=>{ setShowProgress(!showProgress) }}      >
                Upload document

                
      </Button>

        </div>

    );
}