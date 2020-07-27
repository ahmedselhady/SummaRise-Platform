#Import needed libraries
from textstat.textstat import textstatistics, textstat, legacy_round 
from flask_cors import CORS
from flask import jsonify
from flask import request
from flask import Flask
import xgboost as xgb
import pkg_resources
import pandas as pd
import pickle as pkl
import spacy 
import nltk
import os

#check for xgboost version
xgb.__version__

#download nltk for word tokenization
nltk.download('punkt')

#This function saves model as pickle file
def save_pkl(filename,obj):
  pkl.dump(obj, open(filename, 'wb'))

#This function loads model as pickle file 
def load_pkl(filename):
  return(pkl.load(open(filename,'rb')))

#Extract all text dependent features
def text_features(text):
  
  #Load spacy library for nlp to extract featurs from
  nlp = spacy.load('en_core_web_sm') 
  doc = nlp(text)
  sentences = doc.sents

  #create 2 counters and an empty list
  words_no = 0
  sentences_no = 0
  words = []

  #Count number of words and sentences for a given text
  for sentence in sentences: 
    words_no += len([token for token in sentence]) 
    sentences_no += 1

  #Empty text to append all position and tags of a given text
  tag = ''
  pos = ''
  #Loop on all tokens
  for token in doc:
    #print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,token.shape_, token.is_alpha, token.is_stop)
    
    #Get all tags and pos of a text in a string to count spexific characters
    tag += token.tag_ + ' '
    pos += token.pos_ + ' '
  
  # print(tag)
  # print(pos)

  #Count number of commas in given text / total number of sentences 
  commas_no = tag.count(',') / sentences_no
  #Count number of pronouns in given text / total number of sentences 
  pronouns_no = (tag.count('PRP') + tag.count('PRP$')) / sentences_no
  #Count number of verb as modal auxiliary in given text / total number of sentences 
  modal_verbs_no = tag.count('MD') / sentences_no
  #Count number of personal pronouns in given text / total number of sentences 
  personal_pronouns_no = tag.count('PRP') / sentences_no
  #Count number of wh-pronouns in given text / total number of sentences 
  wh_pronouns_no = (tag.count('WP') + tag.count('WP$')) / sentences_no
  #Count number of function words in given text / total number of sentences 
  function_words_no = (tag.count('BES') + tag.count('CC') + tag.count('DT') \
                       + tag.count('EX') + tag.count('HVS') + tag.count('IN') \
                       + tag.count('MD') + tag.count('PRP') + tag.count('PRP$') \
                       + tag.count('RP') + tag.count('TO') + tag.count('UH')) \
                       / sentences_no
  #Count number of verb in base form in given text / total number of sentences 
  VB_tags_no = tag.count('VB') / sentences_no
  #Count number of 	noun as singular or mass in given text / total number of sentences
  NN_tags_no = tag.count('NN') / sentences_no
  #Count number of 	adjective in given text / total number of sentences
  JJ_tags_no = tag.count('JJ') / sentences_no
  #Count number of 	adverb in given text / total number of sentences
  RB_tags_no = tag.count('RB') / sentences_no
  #Count number of verb in past tense in given text / total number of sentences
  VBD_tags_no = tag.count('VBD') / sentences_no
  #Count number of verb in gerund or present participle in given text / total number of sentences
  VBG_tags_no = tag.count('VBG') / sentences_no
  #Count number of verb in past participle in given text / total number of sentences
  VBN_tags_no = tag.count('VBN') / sentences_no
  #Count number of verb in non-3rd person singular present in given text / total number of sentences
  VBP_tags_no = tag.count('VBP') / sentences_no

  #Count number of noun as singular or mass or proper singular or proper plural in given text / total number of words
  nouns_no = (pos.count('NOUN') + pos.count('PROPN')) / words_no
  #Count number of noun as proper singular or proper plural in given text / total number of words
  proper_nouns_no = pos.count('PROPN') / words_no
  #Count number of conjunctions and adverbs in given text / total number of words
  conjunctions_no = (pos.count('CONJ') + pos.count('ADP')) / words_no
  #Count number of adjective as comparative and superlative in given text / total number of words
  adjectives_no = pos.count('ADJ') / words_no
  #Count number of non modal verbs in given text / total number of words
  non_modal_verbs_no = (pos.count('VERB') - tag.count('MD')) / words_no 
  #Count number of interjection in given text / total number of words
  interjections_no = pos.count('INTJ') / sentences_no
  #Count number of wh-adverb in given text / total number of words
  adverbs_no = pos.count('ADV') / sentences_no
  #Count number of determiner in given text / total number of words
  determiners_no = pos.count('DET') / sentences_no

  #return a list with text features
  return [ commas_no , pronouns_no , modal_verbs_no , personal_pronouns_no \
  , wh_pronouns_no , function_words_no , VB_tags_no , VBD_tags_no , VBG_tags_no \
  , VBN_tags_no , VBP_tags_no , nouns_no , proper_nouns_no , conjunctions_no \
  , adjectives_no , non_modal_verbs_no , interjections_no , adverbs_no , determiners_no ]

#Declare a list of connectives
connectives = ['and', 'also', 'besides', 'further', 'furthermore', 'too', 'moreover', 'in addition', 'then', 'of equal importance', 'equally important', 'another','next', 'afterward', 'finally', 'later', 'last', 'lastly', 'at last', 'now', 'subsequently', 'then', 'when', 'soon', 'thereafter',  'meanwhile', 'following',  'ultimately', 'presently','first', 'second', 'finally', 'hence', 'next', 'then', 'after', 'before', 'gradually','above', 'behind', 'below', 'beyond', 'here', 'there', 'nearby', 'opposite', 'moreover', 'furthermore', 'similarly', 'hence', 'so', 'accordingly', 'consequently', 'thus', 'since', 'therefore', 'conversely', 'however', 'still', 'nevertheless', 'nonetheless', 'or', 'actually','like','similarly','but','contrast', 'conversely', 'however', 'still', 'nevertheless', 'nonetheless', 'yet', 'actually', 'briefly', 'finally']

#Analyze logical words features
def Logical_words(text):
  
  #Use nltk for word tokenizer
  words = nltk.word_tokenize(text)
  
  #Create 4 counters
  ands = 0
  ors = 0
  ifs = 0
  neg = 0
  logic_Operators = 0
  no_connectives = 0

  #Loop on all words
  for word in words:
    #count ands
    if word == 'and':
      ands+=1
    #count ors
    elif word == 'or':
      ors+=1
    #count ifs
    elif word == 'if':
      ifs+=1
    #count not
    elif word == 'not' or word == "n't":
      neg+=1
    #count logical operators
    if word == 'not' or word == "and" or word == "or":
      logic_Operators+=1
    #count connectives
    if word in connectives:
      no_connectives+=1
  
  #return a list with logical words features
  return [ands , ors , ifs , neg , logic_Operators , no_connectives]

#Analyse text to return important parameters for all readability fomulas
def get_param(text): 

  #Use spacy lib for tokenization
  nlp = spacy.load('en_core_web_sm') 
  doc = nlp(text)
  sentences = doc.sents

  #create 3 counters
  wordsNo = 0
  sentencesNo = 0
  poly_syllable_count = 0

  #Create an empty list for words
  words = []
  for sentence in sentences: 
    #Count all words
    wordsNo += len([token for token in sentence]) 
    #Count all sentences
    sentencesNo += 1
    #create a list of words
    words += [str(token) for token in sentence]

  #Create a difficult words set to contain difficult words
  diff_words = set() 
  #Load easy word set
  easy_word = set([ln.strip() for ln in pkg_resources.resource_stream('textstat', '/resources/en/easy_words.txt')])
  #Loop on all words
  for word in words: 
    #Get syllable count 
    syllable_count = textstatistics().syllable_count(word) 
    #poly_syllable_count is when syllable is grater than three per word
    if syllable_count >= 3:
      poly_syllable_count += 1
    #Difficult word when the word is not in easy word set and contain more than 2 syllables
    if word not in easy_word and syllable_count >= 2: 
      diff_words.add(word) 
   
  #Analyse text to return important parameters for all readability fomulas
  return wordsNo, sentencesNo, len(diff_words), poly_syllable_count

def dale_chall_readability_score(text):
  #Raw score = 0.1579*(Percentage of difficult words) + 0.0496*(Average sentence length) + 3.6365

  words,sentences,difficult_words,_ = get_param(text) 
  #calculate average sentence length
  average_sentence_length = float(words/sentences)
	# Number of words not termed as difficult words 
  not_difficult_words = words - difficult_words 
  if words > 0: 

		# Percentage of words not on difficult word list 
    per_not_difficult_words = float(not_difficult_words) / float(words) * 100
	# diff_words stores percentage of difficult words 
  per_diff_words = 100 - per_not_difficult_words 
  raw_score = (0.1579 * per_diff_words) + (0.0496 * average_sentence_length) 
	
	# If Percentage of Difficult Words is greater than 5 %, then; 
	# Adjusted Score = Raw Score + 3.6365, 
	# otherwise Adjusted Score = Raw Score 

  if per_diff_words > 5:	 
    raw_score += 3.6365
		
  return legacy_round(raw_score, 2) 
  
def flesch_reading_ease(text): 
  #Reading Ease score = 206.835 - (1.015 × average sentence length) - (84.6 × average word length in syllables)

  words_count,sentences_count,_,_ = get_param(text) 
  #calculate average sentence length
  avg_sentence_length = float(words_count/sentences_count)
  syllable_count = textstatistics().syllable_count(text)
  #calculate average syllables per word
  avg_syllables_per_word = float(syllable_count) / float(words_count)

  FRE = 206.835 - float(1.015 * avg_sentence_length) - float(84.6 * avg_syllables_per_word) 

  return legacy_round(FRE, 2) 

def gunning_fog(text): 
  #Grade level= 0.4 * ( (average sentence length) + (percentage of Hard Words) )

  words_count,sentences_count,difficul_words_count,_ = get_param(text)
  #calculate average sentence length
  avg_sentence_length = float(words_count/sentences_count)
  #calculate percentage of difficult words
  per_diff_words = (difficul_words_count / words_count * 100) + 5
  grade = 0.4 * (avg_sentence_length + per_diff_words) 
  return grade

def smog_index(text):
  #SMOG grading = 3 + √(polysyllable count)
  #polysyllable count = number of words of more than two syllables in a sample of 30 sentences

  _,sentence_count,_,poly_syllable_count = get_param(text) 

  if sentence_count >= 3:
    SMOG = (1.043 * (30*(poly_syllable_count / sentence_count))**0.5) \
            + 3.1291
    return legacy_round(SMOG, 2)
  else:
    return 0

#calculate all text parameters used in readability equations as features
def text_param(text):

  #Use spacy lib for tokenization 
  nlp = spacy.load('en_core_web_sm') 
  doc = nlp(text)
  sentences = doc.sents

  #create 5 counters
  wordsNo = 0
  sentencesNo = 0
  poly_syllable_count = 0
  long_word = 0
  chars = 0

  #Create an empty list for words
  words = []
  for sentence in sentences: 
    #Count all sentences
    sentencesNo += 1
    for token in sentence:
      #Count all words
      wordsNo += 1
      words.append(str(token))
        # print(str(token))

  #Create a difficult words set to contain difficult words
  diff_words = set() 
  #Load easy word set
  easy_word = set([ln.strip() for ln in pkg_resources.resource_stream('textstat', '/resources/en/easy_words.txt')])
  #Load easy word set
  for word in words: 
    #Get syllable count of word
    syllable_count = textstatistics().syllable_count(word) 
    #poly_syllable_count is when syllable is grater than three per word
    if syllable_count >= 3:
      poly_syllable_count += 1
    #Long word is when its length is greater than 7
    if len(word)>7:
      long_word += 1
    #Count no of characters
    chars += len(word)

  #Get syllable count of whole text
  syllable_count = textstatistics().syllable_count(text)
  #Get lexical count of whole text
  lexical_counts = textstat.lexicon_count(text, removepunct=True)
  #calculate average sentence length
  average_sentence_length = float(wordsNo / sentencesNo)
  #calculate average syllables per words
  average_syllables_per_words = float(syllable_count / wordsNo)
  #calculate average poly syllable per words
  average_poly_syllable = float (poly_syllable_count / wordsNo)
  #calculate average long words per words
  average_long_word = float (long_word / wordsNo)
  #calculate average word length
  average_word_length = float (chars / wordsNo)
  
  #return a list with text parameters used in readability equations as features
  return [ wordsNo , sentencesNo, average_sentence_length , syllable_count ,\
          average_syllables_per_words , poly_syllable_count  , lexical_counts ,\
          average_poly_syllable , long_word , average_long_word , average_word_length ]

#this functions predict readability level by extracting features then use decision tree for prediction
def predict_readability_level(text):
  #convert text from a list to data frame
  data = pd.DataFrame([text])
  #create an empty data frame for features
  df = pd.DataFrame()

  #get text features for all rows in data
  df[['commas_number' , 'pronouns_number' , 'modal_verbs_number' , \
      'personal_pronouns_number' , 'wh_pronouns_number' , 'function_words_number' , \
      'VB_tags_number' , 'VBD_tags_number' , 'VBG_tags_number' , 'VBN_tags_number' , \
      'VBP_tags_number' , 'nouns_number' , 'proper_nouns_number' , 'conjunctions_number' , \
      'adjectives_number' , 'non_modal_verbs_number' , 'interjections_number' , \
      'adverbs_number' , 'determiners_number' ]] \
      = data[0].apply(lambda x:pd.Series(text_features(x)))

  #calculate all readability equations for all rows in data
  df["Flesch_Reading_Ease_score"] = data[0].apply(lambda x:flesch_reading_ease(x))
  df["Flesch_Kincaid_Grade_Level"] = data[0].apply(lambda x:textstat.flesch_kincaid_grade(x))
  df["Fog_Scale"] = data[0].apply(lambda x:gunning_fog(x))
  df["SMOG_Index"] = data[0].apply(lambda x:smog_index(x))
  df["Automated_Readability_Index"] = data[0].apply(lambda x:textstat.automated_readability_index(x))
  df["Coleman_Liau_Index"] = data[0].apply(lambda x:textstat.coleman_liau_index(x))
  df["Linsear_Write_Formula"] = data[0].apply(lambda x:textstat.linsear_write_formula(x))
  df["Dale_Chall_Readability_Score"] = data[0].apply(lambda x:dale_chall_readability_score(x))

  #get text parameters used in readability equations for all rows in data
  df[['Word_count' , 'Sentence_count' , 'Average_Sentence_length' , \
      'Syllable_Count' , 'Average_syllables_per_words' , 'poly_syllable_count' , \
      'Lexical_Count' , 'average_poly_syllable' , 'long_word' , 'average_long_word' , \
      'average_word_length']]  = data[0].apply(lambda x:pd.Series(text_param(x)))

  #Drop bad featurs
  df = df.drop('long_word',axis=1)
  df = df.drop('average_long_word',axis=1)

  #Load readability model for predition
  Readability_model=load_pkl("Readability_model.pkl")

  #Use model to predict the right class based on features
  result = Readability_model.predict(df)

  #return the result
  return str(result[0])

#This function for text analysis API for user text
def text_analysis(text): 

  #Use spacy lib for tokenization
  nlp = spacy.load('en_core_web_sm') 
  doc = nlp(text)
  sentences = doc.sents

  #create 3 counters
  wordsNo = 0
  sentencesNo = 0
  chars = 0

  words = []
  for sentence in sentences: 
    #Count all sentences
    sentencesNo += 1
    for token in sentence:
      if token.dep_!='punct':
        #Count all words without punctuation
        wordsNo += 1 
        #create a list of words
        words.append(str(token))

  if sentencesNo>0:
    #calculate average sentence length
    average_sentence_length = float(wordsNo / sentencesNo)
  else:
    average_sentence_length = 0

  #get number of syllables in the text
  syllable_count = textstatistics().syllable_count(text)

  #calculate the number of characters
  for word in words:
    chars += len(word)

  if wordsNo>0:
    #calculate average word length
    average_word_length = float (chars / wordsNo)
  else:
    average_word_length = 0

  return wordsNo, sentencesNo, average_sentence_length, syllable_count, average_word_length

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def home():
    return "<h1>Running Flask ...!</h1>"

@app.route("/readability",methods=['POST'])
def readability():

    data = request.get_json(force=True)
    if data.get('text') == "":
      return "Nan"
    return predict_readability_level(data.get('text'))

@app.route("/text_analysis",methods=['POST'])
def analysis():

    data = request.get_json(force=True)
    text = data.get('text')
    if text!="":
      flesh_score = flesch_reading_ease(text)
      dale_chall = dale_chall_readability_score(text)
      wordsNo, sentencesNo, average_sentence_length, syllable_count, average_word_length = text_analysis(text)
    else:
      wordsNo, sentencesNo, average_sentence_length, syllable_count, average_word_length = 0,0,0,0,0

    return jsonify({'wordsNo':wordsNo,'sentencesNo':sentencesNo,'average_sentence_length':average_sentence_length,\
      'syllable_count':syllable_count,'average_word_length':average_word_length}) , 200
  
if __name__ == '__main__':
    app.run(host = '0.0.0.0',port=8000)


