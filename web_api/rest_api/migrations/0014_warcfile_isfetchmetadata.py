# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-12-01 15:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0013_tfidf'),
    ]

    operations = [
        migrations.AddField(
            model_name='warcfile',
            name='isFetchMetadata',
            field=models.BooleanField(default=False, help_text='Have fetched info from Waston?'),
        ),
    ]