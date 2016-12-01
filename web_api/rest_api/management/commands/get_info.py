# from pprint import pprint

import requests
from datetime import datetime
from django.core.management.base import BaseCommand
from ...models import Document, WarcFile, Image


class Command(BaseCommand):
    def handle(self, *args, **options):

        # fetch pub_date for documents from Alchemy API
        files = WarcFile.objects.filter(isInfoGet=False).all()
        for w_file in files:
            print "fetching info in: "+w_file.name
            docs = Document.objects.filter(file=w_file).all()
            for doc in docs:
                print "fetching doc info"+doc.title

                # fetch publication date using alchemy api
                url = doc.link
                payload = {
                    'url': url,
                    'apikey': '7f9faed9fb0243ad50831864294e108fe5d49529',
                    'outputMode': 'json'
                }
                api_url = "http://gateway-a.watsonplatform.net/calls/url/URLGetPubDate"
                r = requests.get(api_url, params=payload)
                # print r.url
                # pprint(r.json())
                if r.json()['status'] == 'OK':
                    try:
                        date = r.json()['publicationDate']['date'].replace('T', '')
                    except KeyError:
                        date = '19700101000000'
                    try:
                        conf_str = r.json()['publicationDate']['confident']
                    except KeyError:
                        conf_str = 'no'
                    if conf_str == 'no':
                        confident = False
                    else:
                        confident = True
                    if date == '':
                        date = '19700101000000'
                # populate the field with unix zero time when pub_date unavailable
                # this may cause by exceeding daily alchemy api query limit
                else:
                    date = '19700101000000'
                    confident = False

                # update doc
                doc.pub_date = datetime.strptime(date, '%Y%m%d%H%M%S')
                doc.pub_date_confident = confident
                doc.save()

            # fetch classification data using IBM Watson
            print "fetching image metadata"
            imgs = Image.objects.filter(file=w_file).all()
            for img in imgs:
                print "fetching image: "+img.name
                link = img.link
                payload = {
                    'api_key': '7aebad6ade1e483d6b9252f42bdefa0210f7e9d7',
                    'version': '016-05-20',
                    'url': link,
                }
                api_url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify'
                r = requests.get(api_url, params=payload)
                detail = ''
                # print r.json()
                try:
                    for cls in r.json()['images'][0]['classifiers'][0]['classes']:
                        detail = detail + cls['class'] + ', '
                except Exception, e:
                    print e
                    detail = ''

                # KeyValue: no classification info for current img
                # ValueError: IBM BlueMix daily exceeded
                # {
                #   "status": "ERROR",
                #   "statusInfo": "daily-transaction-limit-exceeded"
                # }

                img.detail = detail
                img.save()

            # update file flag
            w_file.isInfoGet = True
            w_file.save()
