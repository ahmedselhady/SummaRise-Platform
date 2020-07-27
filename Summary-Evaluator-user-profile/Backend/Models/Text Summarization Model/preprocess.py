import subprocess
import os
import glob
import re
from nltk.tokenize.stanford import StanfordTokenizer

class Preprocessor:
  def __init__(self):
    self.dm_single_close_quote = u'\u2019'  # unicode
    self.dm_double_close_quote = u'\u201d'
    self.END_TOKENS = ['.', '!', '?', '...', "'", "`", '"', self.dm_single_close_quote, self.dm_double_close_quote,")"]  # acceptable ways to end a sentence

    self.tokenizer = StanfordTokenizer('stanford-postagger.jar', options={"tokenizeNLs": True})
  
  def tokenize(self,text):
    return self.tokenizer.tokenize(text)

  def fix_missing_period(self,line):
    """Adds a period to a line that is missing a period"""

    if line == "": 
        return line
    if line[-1] in self.END_TOKENS: 
        return line
    return line + " ."


  def preprocess_text(self,text):
    """Preprocesses and prepares input text for summarization"""

    # Lowercase everything
    lines = [line.lower() for line in text]
    lines = [self.fix_missing_period(line) for line in lines]

    # Separate out text
    text_lines = []

    for idx,line in enumerate(lines):
      if line == "":
        continue # empty line
      else:
        text_lines.append(line)

    # Make text into a single string
    text = ' '.join(text_lines)
    return text
    