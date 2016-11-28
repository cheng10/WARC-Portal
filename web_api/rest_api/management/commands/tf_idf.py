from django.core.management.base import BaseCommand, CommandError
from ...models import Collection, Document, TfIdf
from sklearn.feature_extraction.text import TfidfVectorizer
import json


class Command(BaseCommand):
    help = 'Calculate the tf-idf scores on all collections and add them to TfIdf model'
    # Thanks to the author on
    # http://www.markhneedham.com/blog/2015/02/15/pythonscikit-
    # learn-calculating-tfidf-on-how-i-met-your-mother-transcripts/

    # def add_arguments(self, parser):
    #     parser.add_argument('collection_id', nargs='+', type=int)

    def handle(self, *args, **options):
        for collection in Collection.objects.all():
            score_kv = {}
            index2id = {}
            corpus = []
            files = collection.file.all()
            docs = Document.objects.none()
            for warc_file in files:
                self.stdout.write(warc_file.name)
                docs = docs | Document.objects.filter(file=warc_file)
            print docs
            i = 0
            for doc in docs:
                # self.stdout.write('adding "%s"' % doc.title)
                index2id[i] = doc.title
                score_kv[index2id[i]] = {}
                corpus.append(doc.content)
                i += 1
            print index2id
            print score_kv
            # for item in corpus:
            #     self.stdout.write(item)
            tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
            tfidf_matrix = tf.fit_transform(corpus)
            feature_names = tf.get_feature_names()
            dense = tfidf_matrix.todense()
            print len(feature_names)
            # print feature_names[100:120]
            # print len(dense[0].tolist()[0])

            print len(dense)
            for i in range(len(dense)):
                # calculate i th document's tf-idf score
                doc = dense[i].tolist()[0]
                phrase_scores = [pair for pair in zip(range(0, len(doc)), doc)if pair[1] > 0]
                print len(phrase_scores)
                # print sorted(phrase_scores, key=lambda t: t[1] * -1)[:5]
                sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)
                sps = sorted_phrase_scores
                for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sps][:5]:
                    print('{0: <20} {1}'.format(phrase, score))
                    score_kv[index2id[i]][phrase] = score

            col = Collection.objects.get(id=collection.id)
            col.score_kv = json.dumps(score_kv)
            col.save()
            ti, created = TfIdf.objects.get_or_create(id=collection.id)
            ti.score_kv = json.dumps(score_kv)
            ti.save()

            self.stdout.write(self.style.SUCCESS('Successfully populated tf-idf score on collection '
                                                 '"%s"' % collection.id))
