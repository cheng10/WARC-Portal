from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


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
        return str(self.id)+self.title

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


# class TfIdf(models.Model):
#     """
#     Store the dictionary of the highest tf-idf scores given a collection.
#     related to :model:`web_api.Document`.
#     """
#     collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
#     score_kv = models.TextField(blank=True, default='null:0.00,')
#
#     def __unicode__(self):
#         return self.collection.name
#
#     class Meta:
#         ordering = ('id',)
