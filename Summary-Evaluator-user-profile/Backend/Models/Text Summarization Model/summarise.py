import sys
import time
import os
import tensorflow as tf
import numpy as np
from collections import namedtuple
from data import Vocab
from batcher import Batcher
from model import SummarizationModel
from decode import BeamSearchDecoder
import preprocess
import glob
import util

class SummaRiser:
    def __init__(self,vocab_path, log_path):
        self.pointer_gen = True
        self.single_pass = True
        self.batch_size = self.beam_size = 4
        self.vocab_size = 50000
        self.vocab_path = vocab_path
        self.log_root = log_path

        # Make a namedtuple hps, containing the values of the hyperparameters that the model needs
        hparam_list = ['mode', 'lr', 'adagrad_init_acc', 'rand_unif_init_mag', 'trunc_norm_init_std', 'max_grad_norm',
                       'hidden_dim', 'emb_dim', 'batch_size', 'max_dec_steps', 'max_enc_steps', 'coverage',
                       'cov_loss_wt',
                       'pointer_gen']
        hps_dict = {
            'mode': 'decode',
            'lr': 0.15,
            'adagrad_init_acc': 0.1,
            'rand_unif_init_mag': 0.02,
            'trunc_norm_init_std': 1e-4,
            'max_grad_norm': 2.0,
            'hidden_dim': 256,
            'emb_dim': 128,
            'batch_size': self.batch_size,
            'max_dec_steps': 100,
            'max_enc_steps': 500,
            'coverage': 1,
            'cov_loss_wt': 1.0,
            'pointer_gen': True,
            'min_dec_steps': 35,
            'beam_size': self.beam_size
        }

        self.hps = namedtuple("HParams", hps_dict.keys())(**hps_dict)
        self.vocab = Vocab(self.vocab_path, self.vocab_size)

        decode_model_hps = self.hps  # This will be the hyperparameters for the decoder model
        decode_model_hps = self.hps._replace(max_dec_steps=1)  # The model is configured with max_dec_steps=1 because we only ever run one step of the decoder at a time (to do beam search). Note that the batcher is initialized with max_dec_steps equal to e.g. 100 because the batches need to contain the full summaries

        tf.set_random_seed(111)  # a seed value for randomness
        self.model = SummarizationModel(decode_model_hps, self.vocab)
        self.decoder = BeamSearchDecoder(self.model, self.vocab,True,self.hps,self.pointer_gen,self.log_root)

    def summarize(self,articles):
        self.batcher = Batcher(articles, self.vocab, self.hps, single_pass=self.single_pass)
        self.decoder.setBatcher(self.batcher)
        return self.decoder.decode(articles)  # decode indefinitely (unless single_pass=True, in which case deocde the dataset exactly once)
