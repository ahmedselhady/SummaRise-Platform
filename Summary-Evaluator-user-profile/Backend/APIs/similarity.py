import pandas as pd
import random
import numpy as np
import string
from gensim.models import KeyedVectors
import math
import re
from collections import Counter
import nltk
#nltk.download("stopwords")
from nltk.corpus import stopwords
import joblib

EMBEDDING_FILE = 'GoogleNews-vectors-negative300.bin.gz'
word2vec = KeyedVectors.load_word2vec_format(EMBEDDING_FILE, binary=True)

WORD = re.compile(r"\w+")

def text_to_vector(text):
    words = WORD.findall(text)
    stopwords = nltk.corpus.stopwords.words('english')
    words = [w for w in words if w not in stopwords]
    return Counter(words)

def get_cosine(sent1, sent2):
    vec1 = text_to_vector(sent1)
    vec2 = text_to_vector(sent2)
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x] ** 2 for x in list(vec1.keys())])
    sum2 = sum([vec2[x] ** 2 for x in list(vec2.keys())])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    else:
        return float(numerator) / denominator

def WMD(sent1,sent2):
  first_sent = sent1.lower().split()
  second_sent = sent2.lower().split()
  stopwords = nltk.corpus.stopwords.words('english')
  first_sent = [w for w in first_sent if w not in stopwords]
  second_sent = [w for w in second_sent if w not in stopwords]
  return (word2vec.wmdistance(second_sent, first_sent))
  
from flask import Flask
from flask import request
from flask_cors import CORS
import joblib 


app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "<h1>Running Flask on Google Colab!</h1>"

@app.route("/similarity",methods=['POST'])
def similarity():
    # Load the model from the file 
    saved_model = joblib.load('LogisticRegression.pkl')
    data_json = request.get_json(force=True)
    # Use the loaded model to make predictions 
 #   article = request.args.get('article')
#    summary = request.args.get('summary')
    article = data_json.get('article')
    summary = data_json.get('summary')
 #   print(article)
#    print(summary)
    dict = {'WMD':[WMD(summary,article)], 
        'Cosine': [get_cosine(summary,article)]} 
  
    validation = pd.DataFrame(dict)

    y = saved_model.predict_proba(validation)
    return str(round(y[0,1]*100,1))

@app.route("/coh",methods=['POST'])
def  cooherence_api():
	return "30.6598"

if __name__ == '__main__':
    app.run(host = '0.0.0.0',port=5000)
