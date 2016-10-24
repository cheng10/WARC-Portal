#!/usr/bin/python

import json

with open('sample_out') as data_file:
    data = json.load(data_file)

for item in data:
    print item
