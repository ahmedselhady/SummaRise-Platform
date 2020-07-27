from flask import Flask, jsonify, request
from preprocess import Preprocessor
from summarise import SummaRiser
from postprocess import Postprocessor
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
preprocessor = None
postprocessor = None
SummaRise = None

MAX_TOKENS = 400
def generate_summary(text):

    sentences = sent_tokenize(text)
    totalSentences = len(sentences)
    tokens = 0 # count of tokens
    tokenized = []
    summarys = ''
    for id,sentence in enumerate(sentences):
        tokenized += preprocessor.tokenize(sentence)
        tokens += len(tokenized)
        if tokens >= MAX_TOKENS or id == (totalSentences - 1):
            tokenized = (' '.join(tokenized))
            preprocessed_text = preprocessor.preprocess_text(tokenized.split('*N*'))
            summary = SummaRise.summarize([preprocessed_text])
            summarys += postprocessor.postprocess_text(summary[0])
            summarys += ' '
            tokens = 0
            tokenized = []

    return summarys

@app.route("/summary", methods = ['POST'])
def getSummary():
    summary = generate_summary(request.json['text'])
    return jsonify({"Summary": summary})

if __name__ == "__main__":
    preprocessor = Preprocessor()
    postprocessor = Postprocessor()
    SummaRise = SummaRiser('./path/to/data/vocab','./')
    app.run(debug = True, port = 3002)