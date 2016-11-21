from django.core.management.base import BaseCommand, CommandError
from ...models import Collection, Document
from sklearn.feature_extraction.text import TfidfVectorizer


class Command(BaseCommand):
    help = 'Calculate the tf-idf scores on all collections and add them to TfIdf model'

    # def add_arguments(self, parser):
    #     parser.add_argument('collection_id', nargs='+', type=int)

    def handle(self, *args, **options):
        for collection in Collection.objects.all():
            corpus = []
            score_kv = ''
            files = collection.file.all()
            docs = Document.objects.none()
            for warc_file in files:
                self.stdout.write(warc_file.name)
                docs = docs | Document.objects.filter(file=warc_file)
                print docs
            for doc in docs:
                # self.stdout.write('adding "%s"' % doc.title)
                corpus.append(doc.content)
            # for item in corpus:
            #     self.stdout.write(item)
            tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
            tfidf_matrix = tf.fit_transform(corpus)
            feature_names = tf.get_feature_names()
            dense = tfidf_matrix.todense()
            print len(feature_names)
            # print feature_names[100:120]
            # print len(dense[0].tolist()[0])
            doc = dense[0].tolist()[0]
            phrase_scores = [pair for pair in zip(range(0, len(doc)), doc)]
            print len(phrase_scores)
            # print sorted(phrase_scores, key=lambda t: t[1] * -1)[:5]
            sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)
            for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sorted_phrase_scores][:20]:
                print('{0: <20} {1}'.format(phrase, score))
                score_kv += "'{0}':'{1}',".format(phrase, score)
            col = Collection.objects.get(id=collection.id)
            col.score_kv = score_kv
            col.save()

            self.stdout.write(self.style.SUCCESS('Successfully populated tf-idf score on collection '
                                                 '"%s"' % collection.id))
