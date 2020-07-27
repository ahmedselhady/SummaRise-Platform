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
import { POST, POST_AUTH } from '../../../Services/HttpHandlers';

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

    progressBar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(1),
        }
    }
}));

export default function NewProject(props) {

    const classes = useStyles();
    const timerRef = React.useRef();

    const [loading, setLoading] = React.useState(false);

    const [document, setDocument] = React.useState("");
    const [summary, setSummary] = React.useState("");
    const [summaryName, setSummaryName] = React.useState("");

    const [documentAnalysis, setDocumentAnalysis] = React.useState({
        average_sentence_length: "?",
        average_word_length: "?",
        sentencesNo: "?",
        syllable_count: "?",
        wordsNo: "?"
    });

    const [summaryAnalysis, setSummaryAnalysis] = React.useState({
        average_sentence_length: "?",
        average_word_length: "?",
        sentencesNo: "?",
        syllable_count: "?",
        wordsNo: "?"
    });

    const [summaryCoherence, setSummaryCoherence] = React.useState(undefined);
    const [summaryReadability, setSummaryReadability] = React.useState(undefined);
    const [summarySimilarity, setSummarySimilarity] = React.useState(undefined);

    const [documentCoherence, setDocumentCoherence] = React.useState(undefined);
    const [documentReadability, setDocumentReadability] = React.useState(undefined);

    const [showProgress, setShowProgress] = React.useState(false);

    const handleSaveProject = () => {

        // event.preventDefault();

        const summaryDataToBeSaved = {
            "document": document,
            "summary": summary,
            "summary_coherence": summaryCoherence,
            "summary_readability": summaryReadability,
            "summary_Similarity": summarySimilarity,
            "document_coherence": documentCoherence,
            "document_readability": documentReadability,
            "summary_analysis": summaryAnalysis,
            "document_analysis": documentAnalysis
        };

        POST_AUTH(BASE_URL, 'project/' + summaryName, summaryDataToBeSaved, props.token)
            .then(response => (!response.ok ? undefined : response.JSON()))
    }

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        [],
    );

    const getAlertTypeCoherence = (value) => {


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

    }

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

    }

    const resetOutput = (deleteSummary) => {

        setDocumentAnalysis({
            average_sentence_length: "?",
            average_word_length: "?",
            sentencesNo: "?",
            syllable_count: "?",
            wordsNo: "?"
        });

        setSummaryAnalysis({
            average_sentence_length: "?",
            average_word_length: "?",
            sentencesNo: "?",
            syllable_count: "?",
            wordsNo: "?"
        });

        if (deleteSummary) {
            setSummary("");
        }

        setSummaryCoherence(undefined);
        setSummaryReadability(undefined);
        setSummarySimilarity(undefined);

        setDocumentCoherence(undefined);
        setDocumentReadability(undefined);
    }

    const handleGrenrateSummary = () => {

        if (document) {
            setShowProgress(true);
            resetOutput(true);

            POST(COHERENCE_URL, 'coherence', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(coherecne_score => {
                    setDocumentCoherence(parseFloat(coherecne_score).toFixed(1));
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
                        average_sentence_length: data.average_sentence_length.toFixed(1),
                        average_word_length: data.average_word_length.toFixed(1),
                        sentencesNo: data.sentencesNo,
                        syllable_count: data.syllable_count,
                        wordsNo: data.wordsNo
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
                        console.log("summary: ", summary);

                        POST(READABILITY_URL, 'text_analysis', {
                            text: parsedSummary.Summary
                        }).then(response => (!response.ok ? undefined : response.text()))
                            .then(response => (!response ? undefined : JSON.parse(response)))
                            .then(data => {
                                setSummaryAnalysis({
                                    average_sentence_length: data.average_sentence_length.toFixed(1),
                                    average_word_length: data.average_word_length.toFixed(1),
                                    sentencesNo: data.sentencesNo,
                                    syllable_count: data.syllable_count,
                                    wordsNo: data.wordsNo
                                })
                            }).catch(error => {
                                console.log('error: ', error, 'occurred in on processing "Summary Analysis for Generated Summary"')
                            });

                        POST(COHERENCE_URL, 'coherence', {
                            text: parsedSummary.Summary
                        }).then(response => (!response.ok ? undefined : response.text()))
                            .then(coherecne_score => {
                                setSummaryCoherence(parseFloat(coherecne_score).toFixed(1));
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
                            article: document,
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

                    setShowProgress(false);

                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Generate Summary"');
                    setShowProgress(false);
                });

        } else {

            alert("Please make sure you inserted the document to be summarized!");

        }

    }

    const handleEvaluateSummary = () => {

        if (document && summary) {

            setShowProgress(true);
            resetOutput(false);

            POST(COHERENCE_URL, 'coherence', {
                text: document
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(coherecne_score => {
                    setDocumentCoherence(parseFloat(coherecne_score).toFixed(1));
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
                        average_sentence_length: data.average_sentence_length.toFixed(1),
                        average_word_length: data.average_word_length.toFixed(1),
                        sentencesNo: data.sentencesNo,
                        syllable_count: data.syllable_count,
                        wordsNo: data.wordsNo
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
                        average_sentence_length: data.average_sentence_length.toFixed(1),
                        average_word_length: data.average_word_length.toFixed(1),
                        sentencesNo: data.sentencesNo,
                        syllable_count: data.syllable_count,
                        wordsNo: data.wordsNo
                    })
                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Summary Analysis for Evaluated Summary"')
                });

            POST(COHERENCE_URL, 'coherence', {
                text: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(coherecne_score => {
                    setSummaryCoherence(parseFloat(coherecne_score).toFixed(2));
                    setShowProgress(false);

                }).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Coherence Computation for Evaluated Summary"');
                    setShowProgress(false);
                });

            POST(READABILITY_URL, 'readability', {
                text: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(readability_score => {
                    setSummaryReadability(readability_score);
                    setShowProgress(false);
                }
                ).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Readability Computation for Evaluated Summary"');
                    setShowProgress(false);
                });

            POST(SIMILARITY_URL, 'similarity', {
                article: document,
                summary: summary
            }).then(response => (!response.ok ? undefined : response.text()))
                .then(similarity_score => {
                    setSummarySimilarity(parseFloat(similarity_score))
                    setShowProgress(false);
                }
                ).catch(error => {
                    console.log('error: ', error, 'occurred in on processing "Similarity Computation for Evaluated Summary"');
                    setShowProgress(false);
                });

        } else {
            alert("Please make sure you inserted both the document and the summary to be evaluated!");
        }
    }

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
                                {documentAnalysis.average_sentence_length} {" avg. sentence length"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.average_word_length} {" avg. words length"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.syllable_count}  {" syllables"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.sentencesNo} {" sentences"} |
                            </Typography>
                            <Typography variant="h6" >
                                {documentAnalysis.wordsNo}   {" words"}
                            </Typography>
                        </div>

                        <textarea
                            style={{ width: "98%", minHeight: "70vh", margin: "1%" }}
                            onChange={(event) => {
                                setDocument(event.target.value);
                                resetOutput(true);
                            }}
                            value={document}
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
                        <SummaryBar
                            onGenerateSummary={handleGrenrateSummary}
                            onEvaluateSummary={handleEvaluateSummary}
                            // setSummary={setSummary}
                            setSummaryName={setSummaryName}
                            token={props.token}
                            saveProject={handleSaveProject} />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexGrow: "1"
                        }}>
                            <Typography variant="h6" >
                                {summaryAnalysis.average_sentence_length} {" avg. sentence length"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.average_word_length} {" avg. words length"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.syllable_count}  {" syllables"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.sentencesNo} {" sentences"} |
                            </Typography>
                            <Typography variant="h6" >
                                {summaryAnalysis.wordsNo}   {" words"}
                            </Typography>
                        </div>

                        {showProgress ?
                            <div className={classes.progressBar} >

                                <LinearProgress />
                                <LinearProgress color="secondary" />
                            </div>
                            : null
                        }

                        <textarea style={{ width: "98%", minHeight: "70vh", margin: "1%" }}

                            onChange={(event) => {
                                setSummary(event.target.value);
                            }}
                            value={summary}
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
        </div >
    );
}

