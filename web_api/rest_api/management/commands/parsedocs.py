import os
import json
from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from ...models import Document, WarcFile

DIR = "rest_api/parse/"


class Command(BaseCommand):
    def handle(self, *args, **options):
        for filename in os.listdir(DIR):
            if filename.startswith('sample'):
                print "Parsing..." + filename
                f = open(DIR+filename)
                warc = WarcFile.objects.create(name="dummy"+filename)
                for line in f:
                    try:
                        data = json.loads(line)
                        if len(data) != 4:
                            print "Did not parse %s" % data[2]
                            raise 
                    except:
                        print "Error parsing JSON"

                    # only when the content is valid, push them to DB
                    # if data[2].startswith('HTTP/1.1 200') or data[2].startswith('HTTP/1.0 200'):
                    if data[2].split()[1] == '200':
                        Document.objects.create(
                            title='fake tile',
                            file=warc,
                            crawl_date=datetime.strptime(data[0], '%Y%m%d').strftime("%Y-%m-%d"),
                            link=data[1],
                            content=data[2].encode('unicode_escape'),
                            type='html'
                        )
