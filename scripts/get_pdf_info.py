#!/usr/bin/python
import urllib
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument

url = 'http://www.ecb.int/ecb/legal/pdf/en_con_2010_35_f_sign.pdf'
filename = url.split('?')[0].split('/')[-1] 
urllib.urlretrieve(url, filename)
fp = open(filename, 'rb')
parser = PDFParser(fp)
doc = PDFDocument(parser)

print doc.info  # The "Info" metadata
print doc.info[0]['CreationDate']
