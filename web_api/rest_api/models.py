from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    content = models.TextField()

    class Meta:
        ordering = ('created',)


# class WarcUser(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)


class WarcFile(models.Model):
    name = models.CharField(max_length=100, blank=True, default='')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class Document(models.Model):
    DOC_TYPE = (
        ('html', 'html file'),
        ('pdf', 'pdf file'),
        ('other', 'other file type'),
    )
    crawl_date = models.DateTimeField()
    title = models.CharField(max_length=100, blank=True, default='')
    type = models.CharField(max_length=50, choices=DOC_TYPE, default='other')
    detail = models.TextField(blank=True, default='')  # detail description
    link = models.TextField(blank=True, default='')  # way back server link
    file = models.ForeignKey(WarcFile, on_delete=models.CASCADE, related_name='document')
    # content = models.TextField(blank=True, default='')

    def __unicode__(self):
        return self.link

    def __str__(self):
        return self.link

    class Meta:
        ordering = ('crawl_date',)


class Image(models.Model):
    crawl_date = models.DateTimeField()
    name = models.CharField(max_length=100, blank=True, default='')
    detail = models.TextField(blank=True, default='')  # detail description, metadata?
    link = models.TextField(blank=True, default='')  # way back server link
    file = models.ForeignKey(WarcFile, on_delete=models.CASCADE, related_name='image')

    def __unicode__(self):
        return self.title

    class Meta:
        ordering = ('crawl_date',)


class Collection(models.Model):
    warcuser = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, default='')
    detail = models.TextField(blank=True, default='')  # detail description
    file = models.ManyToManyField(WarcFile)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ('name',)
