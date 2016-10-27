import os, json, requests
from pprint import pprint
from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from ...models import Document, WarcFile

DIR = "/mnt/md0/spark_out/"


class Command(BaseCommand):
    def handle(self, *args, **options):
        for filename in os.listdir(DIR):
            if filename.startswith('part'):
                print "Parsing..." + filename
                f = open(DIR+filename)
                warc = WarcFile.objects.create(name="dummy_"+filename)
                for line in f:
                    try:
                        data = json.loads(line)
                        if len(data) != 5:
                            print "Did not parse %s" % data[3]
                            raise 
                    except:
                        print "Error parsing JSON"

                    # only when the content is valid, push them to DB
                    # if data[2].startswith('HTTP/1.1 200') or data[2].startswith('HTTP/1.0 200'):
                    # if data[2].split()[1] == '200':
                    if 1:

                        # fetch publication date using alchemyapi
                        url = data[2]
                        payload = {
                            'url': url,
                            'apikey': '7f9faed9fb0243ad50831864294e108fe5d49529',
                            'outputMode': 'json'
                        }
                        api_url = "http://gateway-a.watsonplatform.net/calls/url/URLGetPubDate"
                        r = requests.get(api_url, params=payload)

                        print r.url
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
                        # this may cause by exceeding daily alchemyapi query limit
                        else:
                            date = '19700101000000'
                            confident = False

                        Document.objects.create(
                            title='fake tile',
                            file=warc,
                            pub_date=datetime.strptime(date, '%Y%m%d%H%M%S'),
                            pub_date_confident=confident,
                            crawl_date=datetime.strptime(data[0], '%Y%m%d').strftime("%Y-%m-%d"),
                            link=data[2],
                            content=data[3].encode('unicode_escape'),
                            type='html'
                        )
