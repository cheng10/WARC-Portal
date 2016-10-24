import os
from ast import literal_eval as make_tuple
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web_api.settings")
# from web_api.models import Snippet

DIR = "./rest_api/parse/"

if __name__=='__main__':
    print("Parsing...")
    for filename in os.listdir(DIR):
        print filename
        if filename.startswith('part'):
            f = open(DIR+filename)
            for line in f:
                data = json.loads(line)
                if len(data) != 4:
                    print "Did not parse %s" % data[2]
                # Document.object
