from preprocess import Preprocessor
from summarise import SummaRiser
from postprocess import Postprocessor
from nltk.tokenize import sent_tokenize

MAX_TOKENS = 500
MIN_TOKENS = 100
def generate_summary(text):
    preprocessor = Preprocessor()
    postprocessor = Postprocessor()
    SummaRise = SummaRiser('./path/to/data/vocab','./')

    sentences = sent_tokenize(text)
    totalSentences = len(sentences)
    tokens = 0 # count of tokens
    tokenized = []
    summarys = ''
    for id,sentence in enumerate(sentences):
        tokenized += preprocessor.tokenize(sentence)
        tokens += len(tokenized)
        if tokens >= MAX_TOKENS or (id == (totalSentences - 1) and tokens >= MIN_TOKENS):
            tokenized = (' '.join(tokenized))
            preprocessed_text = preprocessor.preprocess_text(tokenized.split('*N*'))
            print(preprocessed_text)
            summary = SummaRise.summarize([preprocessed_text])
            summarys += postprocessor.postprocess_text(summary[0])
            summarys += ' '
            tokens = 0
            tokenized = []

    return summarys

text = "A use case is a methodology used in system analysis to identify clarify and organize system requirements The use case is made up of a set of possible sequences of interactions between systems and users in a particular environment and related to a particular goal."
print(generate_summary(text))