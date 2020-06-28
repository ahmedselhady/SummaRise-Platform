import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DocumentBar from './DocumentBar';
import SummaryBar from './SummaryBar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import { BASE_URL, COHERENCE_URL, SIMILARITY_URL, READABILITY_URL, SUMMARY_URL } from '../../../Services/Common';
import { POST } from '../../../Services/HttpHandlers';

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

    const [document, setDocument] = React.useState("");
    const [summary, setSummary] = React.useState("");

    const [documentAnalysis, setDocumentAnalysis] = React.useState({
        numberOfWords: "?",
        numberOfSentences: "?",
        wordsPerSentences: "?",
        daleChallScore: "?",
        fleshReadingEase: "?"
    });

    const [summaryAnalysis, setSummaryAnalysis] = React.useState({
        numberOfWords: "?",
        numberOfSentences: "?",
        wordsPerSentences: "?",
        daleChallScore: "?",
        fleshReadingEase: "?"
    });

    const [summaryCoherence, setSummaryCoherence] = React.useState(undefined);
    const [summaryReadability, setSummaryReadability] = React.useState(undefined);
    const [summarySimilarity, setSummarySimilarity] = React.useState(undefined);

    const [documentCoherence, setDocumentCoherence] = React.useState(undefined);
    const [documentReadability, setDocumentReadability] = React.useState(undefined);

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const getAlertTypeCoherence = (value) => {

        console.log('similarity: ', value);

        if (value) {

            if (value >= -5) {
                return "success";
            } else if (value >= -10) {
                return "warning";
            } else {
                return "error";
            }

        }

        return "info"
    }

    const getAlertTypeReadability = (value) => {

        if (value) {
            if (value == '0') {
                return 'success';
            } else if (value == '1') {
                return 'warning';
            }
            return 'error';
        }

        return "info"
    }

    const getAlertTypeSimilarity = (value) => {

        if (value) {
            if (value >= 70) {
                return "success";
            } else if (value >= 30) {
                return "warning";
            } else {
                return "error";
            }
        }

        return "info"
    }

    const getReadabilityCateogory = (value) => {

        if (value) {


            if (value == '0') {
                return 'Elementary';
            } else if (value == '1') {
                return 'Intermediate';
            }
            return 'Advanced';
        }
        return "unknown"
    }

    const getSimilarityCategory = (value) => {

        if (value) {
            if (value >= 90) {
                return "Very Similar";
            } else if (value >= 70) {
                return "Similar";
            } else if (value >= 50) {
                return "Barely Similar";
            } else if (value >= 30) {
                return "Not Similar";
            } else {
                return "Entirely Not Similar";
            }
        }
        return "?"

    };

    const getCoherenceCategory = (value) => {

        if (value) {


            if (value >= 5) {
                return "High";
            } else if (value >= -5) {
                return "Moderate";
            } else if (value >= -10) {
                return "Low";
            } else {
                return "Very Low";
            }
        }
        return "?"

    };

    const handleGrenrateSummary = () => {

        if (document) {


            POST(COHERENCE_URL, 'coherence', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(coherecne_score => {
                    setDocumentCoherence(parseFloat(coherecne_score).toFixed(2));
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Coherence Computation for Evaluated Summary"')
                });

            POST(READABILITY_URL, 'readability', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(readability_score =>
                    setDocumentReadability(readability_score)
                ).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Readability Computation for Evaluated Summary"')
                });

            POST(READABILITY_URL, 'text_analysis', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(response => (!response ? undefined : JSON.parse(response)))
                .then(data => {
                    setDocumentAnalysis({
                        numberOfWords: data.wordsNo,
                        numberOfSentences: data.sentencesNo,
                        wordsPerSentences: data.average_sentence_length,
                        daleChallScore: data.dale_chall,
                        fleshReadingEase: data.flesh_score
                    })
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Document Analysis" @Evaluation')
                });


            POST(SUMMARY_URL, 'summary', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(summary => (!summary ? undefined : JSON.parse(summary)))
                .then(parsedSummary => {

                    if (parsedSummary) {

                        setSummary(parsedSummary.Summary);

                        POST(READABILITY_URL, 'text_analysis', {
                            text: parsedSummary.Summary
                        }).then(response => (!response.ok ? undefined : response.text()))
                            .then(response => (!response ? undefined : JSON.parse(response)))
                            .then(data => {
                                setSummaryAnalysis({
                                    numberOfWords: data.wordsNo,
                                    numberOfSentences: data.sentencesNo,
                                    wordsPerSentences: data.average_sentence_length,
                                    daleChallScore: data.dale_chall,
                                    fleshReadingEase: data.flesh_score
                                })
                            }).catch(error => {
                                console.log('error: ', error, 'occurred in on processing "Summary Analysis for Generated Summary"')
                            });

                        POST(COHERENCE_URL, 'coherence', {
                            text: parsedSummary.Summary
                        }).then(response => (!response.ok ? undefined : response.text()))
                            .then(coherecne_score => {
                                setSummaryCoherence(parseFloat(coherecne_score).toFixed(2));
                            }).catch(error => {
                                console.log('error: ', error, 'occurred in on processing "Coherence Computation for Generated Summary"')
                            });

                        POST(READABILITY_URL, 'readability', {
                            text: parsedSummary.Summary
                        }).then(response => (!response.ok ? undefined : response.text()))
                            .then(readability_score =>
                                setSummaryReadability(readability_score)
                            ).catch(error => {
                                console.log('error: ', error, 'occurred in on processing "Readability Computation for Generated Summary"')
                            });

                        POST(SIMILARITY_URL, 'similarity', {
                            article: props.document,
                            summary: parsedSummary.Summary
                        }).then(response => (!response.ok ? undefined : response.text()))
                            .then(similarity_score =>
                                setSummarySimilarity(parseFloat(similarity_score))
                            ).catch(error => {
                                console.log('error: ', error, 'occurred in on processing "Similarity Computation for Generated Summary"')
                            });

                    } else {
                        alert("somethong went wrong!");
                    }
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Generate Summary"')
                });

        } else {

            alert("Please make sure you inserted the document to be summarized!");

        }

    };

    const handleEvaluateSummary = () => {

        if (document && summary) {


            POST(COHERENCE_URL, 'coherence', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(coherecne_score => {
                    setDocumentCoherence(parseFloat(coherecne_score).toFixed(2));
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Coherence Computation for Evaluated Summary"')
                });

            POST(READABILITY_URL, 'readability', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(readability_score =>
                    setDocumentReadability(readability_score)
                ).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Readability Computation for Evaluated Summary"')
                });

            POST(READABILITY_URL, 'text_analysis', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(response => (!response ? undefined : JSON.parse(response)))
                .then(data => {
                    setDocumentAnalysis({
                        numberOfWords: data.wordsNo,
                        numberOfSentences: data.sentencesNo,
                        wordsPerSentences: data.average_sentence_length,
                        daleChallScore: data.dale_chall,
                        fleshReadingEase: data.flesh_score
                    })
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Document Analysis" @Evaluation')
                });

            POST(READABILITY_URL, 'text_analysis', {
                text: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(response => (!response ? undefined : JSON.parse(response)))
                .then(data => {
                    setSummaryAnalysis({
                        numberOfWords: data.wordsNo,
                        numberOfSentences: data.sentencesNo,
                        wordsPerSentences: data.average_sentence_length,
                        daleChallScore: data.dale_chall,
                        fleshReadingEase: data.flesh_score
                    })
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Summary Analysis for Evaluated Summary"')
                });

            POST(COHERENCE_URL, 'coherence', {
                text: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(coherecne_score => {
                    setSummaryCoherence(parseFloat(coherecne_score).toFixed(2));
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Coherence Computation for Evaluated Summary"')
                });

            POST(READABILITY_URL, 'readability', {
                text: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(readability_score =>
                    setSummaryReadability(readability_score)
                ).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Readability Computation for Evaluated Summary"')
                });

            POST(SIMILARITY_URL, 'similarity', {
                article: document,
                summary: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(similarity_score =>
                    setSummarySimilarity(parseFloat(similarity_score))
                ).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Similarity Computation for Evaluated Summary"')
                });

        } else {
            alert("Please make sure you inserted both the document and the summary to be evaluated!");
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                {/* original document */}

                <Grid item xs={12} sm={6}>

                    <Paper className={classes.paper}>

                        <DocumentBar setDocument={setDocument} />
                        {/* {loading ? <LinearProgress color="secondary" /> : null} */}
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1"
                        }}>
                            <Typography variant="h6" >
                                {documentAnalysis.numberOfWords} {" words"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.numberOfSentences} {" sentences"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.wordsPerSentences} {" words per sentences"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.daleChallScore}  {" dale-chall score"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.fleshReadingEase}   {" flesh reading ease"}
                            </Typography>
                        </div>

                        <textarea
                            style={{ width: "98%", minHeight: "70vh", margin: "1%" }}
                            onChange={(event) => {
                                setDocument(event.target.value);
                            }}
                        />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1",
                            paddingBottom: "1%"
                        }}>
                            <Alert variant="filled" severity={getAlertTypeCoherence(documentCoherence)}>{"Document Coherence Level: "}{getCoherenceCategory(documentCoherence)}</Alert>
                            <Alert variant="filled" severity={getAlertTypeReadability(documentReadability)}>{"Document Readability Level: "} {getReadabilityCateogory(documentReadability)}</Alert>
                        </div>
                    </Paper>
                </Grid>

                {/* summary */}

                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <SummaryBar onGenerateSummary={handleGrenrateSummary} onEvaluateSummary={handleEvaluateSummary} setSummary={setSummary} />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1"
                        }}>
                            <Typography variant="h6" >
                                {summaryAnalysis.numberOfWords} {" words"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.numberOfSentences} {" sentences"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.wordsPerSentences} {" words per sentences"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.daleChallScore}  {" dale-chall score"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.fleshReadingEase}   {" flesh reading ease"}
                            </Typography>
                        </div>

                        <textarea  style={{ width: "98%", minHeight: "70vh", margin: "1%" }}

                            
                            onChange={(event) => {
                                event.preventDefault();   
                                setSummary(event.target.value);
                            }}
                        />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1",
                            paddingBottom: "1%"
                        }}>
                            <Alert variant="filled" severity={getAlertTypeSimilarity(summarySimilarity)}>{"Summary-to-Document Similarity: "} {getSimilarityCategory(summarySimilarity)}</Alert>
                            <Alert variant="filled" severity={getAlertTypeCoherence(summaryCoherence)}>{"Summary Coherence Level: "}{getCoherenceCategory(summaryCoherence)}</Alert>
                            <Alert variant="filled" severity={getAlertTypeReadability(summaryReadability)}>{"Summary Readability Level: "} {getReadabilityCateogory(summaryReadability)}</Alert>
                        </div>

                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

