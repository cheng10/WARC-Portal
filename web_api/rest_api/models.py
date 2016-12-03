from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from sklearn.feature_extraction.text import TfidfVectorizer
import json


# class Snippet(models.Model):
#     """
#     Used to test the basic functionality of rest api,
#     not meant to be used in the production environment.
#     """
#     created = models.DateTimeField(auto_now_add=True)
#     title = models.CharField(max_length=100, blank=True, default='')
#     content = models.TextField()
#
#     class Meta:
#         ordering = ('created',)


class WarcFile(models.Model):
    """
    Stores the name of the warc file.
    """
    name = models.CharField(max_length=100, blank=True, default='',
                            help_text='The name of the warc file')
    isInfoGet = models.BooleanField(default=False,
                                    help_text='Have fetched info from Waston?')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('id',)


class Document(models.Model):
    """
    Stores the documents extracted from warc files, related to
    :model:`rest_api.WarcFile`.

    """
    DOC_TYPE = (
        ('html', 'html file'),
        ('pdf', 'pdf file'),
        ('other', 'other file type'),
    )
    crawl_date = models.DateTimeField(help_text='The crawl date of the web page, extracted from Warcbase.')
    pub_date = models.DateTimeField(help_text='The publication date of the web page, using IBM Alchemy API'
                                              'to query publication date.')
    pub_date_confident = models.BooleanField(default='False',
                                             help_text='The confident value from the IBM alchemy query result,'
                                                       'true as confident, false as not.')
    title = models.CharField(max_length=255, blank=True, default='',
                             help_text='Title of the web page, extracted from html tile tag, if not found, '
                                       'use the domain name instead.')
    type = models.CharField(max_length=50, choices=DOC_TYPE, default='other')
    detail = models.TextField(blank=True, default='',
                              help_text='Used to store extra info like metadata or label.')
    link = models.TextField(blank=True, default='',
                            help_text='URL link to the way back server.')
    domain = models.TextField(blank=True, default='')
    file = models.ForeignKey(WarcFile, on_delete=models.CASCADE)
    content = models.TextField(blank=True, default='',
                               help_text='The body of the web page, removed html tag.')
    hash = models.TextField(blank=True, default='')

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('id',)


class Image(models.Model):
    """
    Stores the images extracted from warc files,
    related to :model:`web_api.WarcFile`.
    """
    crawl_date = models.DateTimeField()
    name = models.CharField(max_length=100, blank=True, default='',
                            help_text='The file name of the image.')
    detail = models.TextField(blank=True, default='',
                              help_text='Stores meta data of the image.')
    link = models.TextField(blank=True, default='',
                            help_text='URL link to the way back image server.')
    file = models.ForeignKey(WarcFile, on_delete=models.CASCADE, related_name='image')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('id',)


class Collection(models.Model):
    """
    Stores user's warc file collections,
    related to :model:`auth.User` and :model:`web_api.WarcFile`.
    """
    warcuser = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, unique=True, default='',
                            help_text='Name of the warc file collection.')
    detail = models.TextField(blank=True, default='',
                              help_text='Description of the collection.')
    score_kv = models.TextField(blank=True, default='null:0.00,')
    file = models.ManyToManyField(WarcFile)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('id',)


# class TfManager(models.Manager):
#     def create_tf(self, collection_id):
#         ti = self.create(id=collection_id)
#
#         collection = Collection.objects.get(id=collection_id)
#         score_kv = {}
#         score_kv_ = {}
#         index2id = {}
#         corpus = []
#         files = collection.file.all()
#         docs = Document.objects.none()
#         for warc_file in files:
#             # self.stdout.write(warc_file.name)
#             docs = docs | Document.objects.filter(file=warc_file)
#         print docs
#         i = 0
#         for doc in docs:
#             # self.stdout.write('adding "%s"' % doc.title)
#             index2id[i] = doc.title
#             score_kv[index2id[i]] = {}
#             score_kv_[index2id[i]] = {}
#             corpus.append(doc.content)
#             i += 1
#         print index2id
#         print score_kv
#         print score_kv_
#         # for item in corpus:
#         #     self.stdout.write(item)
#         tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
#         tfidf_matrix = tf.fit_transform(corpus)
#         feature_names = tf.get_feature_names()
#         dense = tfidf_matrix.todense()
#         print len(feature_names)
#         # print feature_names[100:120]
#         # print len(dense[0].tolist()[0])
#
#         print len(dense)
#         for i in range(len(dense)):
#             # calculate i th document's tf-idf score
#             doc = dense[i].tolist()[0]
#             phrase_scores = [pair for pair in zip(range(0, len(doc)), doc)if pair[1] > 0]
#             print len(phrase_scores)
#             # print sorted(phrase_scores, key=lambda t: t[1] * -1)[:5]
#             sorted_phrase_scores = sorted(phrase_scores, key=lambda t: t[1] * -1)
#             sps = sorted_phrase_scores
#             for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sps][:25]:
#                 print('{0: <20} {1}'.format(phrase, score))
#                 score_kv[index2id[i]][phrase] = score
#             for phrase, score in [(feature_names[word_id], score) for (word_id, score) in sps][:5]:
#                 print('{0: <20} {1}'.format(phrase, score))
#                 score_kv_[index2id[i]][phrase] = score
#
#         ti.score_kv = json.dumps(score_kv)
#         ti.save()
#
#         collection.score_kv = json.dumps(score_kv_)
#         collection.save()
#
#         return ti


class TfIdf(models.Model):
    """
    Store the dictionary of the highest tf-idf scores given a collection.
    related to :model:`web_api.Document`.
    """
    # just use the same id as the collection where the tf-idf score is from
    # collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    score_kv = models.TextField(blank=True, default='null:0.00,')

    # objects = TfManager()

    def __unicode__(self):
        return str(self.id)

    class Meta:
        ordering = ('id',)
