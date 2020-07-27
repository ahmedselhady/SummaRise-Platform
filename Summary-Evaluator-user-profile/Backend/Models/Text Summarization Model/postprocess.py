import subprocess
import os
import glob
import re
from nltk.tokenize.stanford import StanfordTokenizer
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
import truecase

class Postprocessor:

    def __init__(self):
        pass
    
    def fix_summary(self,text):
        text = text.replace('S ','s ')
        text = text.replace('T ','t ')
        text = text.replace('Ve ','ve ')
        text = text.replace('Re ','re ')
        text = text.replace('- Rrb-',')')
        text = text.replace('- Lrb- ',' (')
        text = text.replace('``',' "')
        text = text.replace('" ','"')
        text = text.replace('\'\'', '"')
        text = text.replace('$ ',' $')
        return text

    def truecasing_by_sentence_segmentation(self,text):
        # split the text into sentences
        sentences = sent_tokenize(text, language = 'english')
        # capitalize the sentences
        sentences_capitalized = [s.capitalize() for s in sentences]
        # join the capitalized sentences
        text_truecased = re.sub(" (?=[\.,'!?:;])", "", ' '.join(sentences_capitalized))
        
        return text_truecased


    def postprocess_text(self,text):
        """Postprocesses and prepares the output summarized text"""

        # Lowercase everything
        text = self.truecasing_by_sentence_segmentation(text)
        text = truecase.get_true_case(text)
        text = self.fix_summary(text)
        return text
