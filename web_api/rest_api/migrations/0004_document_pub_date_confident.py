# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-25 16:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0003_auto_20161025_0132'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='pub_date_confident',
            field=models.BooleanField(default='False'),
        ),
    ]
