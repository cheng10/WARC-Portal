from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.utils import timezone
from .models import WarcFile, Document, Image, Collection


def create_user(username, pwd):
    """
    Creates a user with the given 'username' and 'pwd'.
    :param username:
    :param pwd:
    :return: new user instance
    """
    return User.objects.create_user(
        username=username,
        password=pwd
    )


def create_file(file_name):
    """
    Creates a warc file with the given `filename`.
    :param file_name:
    :return: new warc file instance
    """
    return WarcFile.objects.create(name=file_name)


def create_document(title, d_type, d_file):
    """
    create a document with the given 'title', 'type' and 'file'.
    :param title:
    :param d_type:
    :param d_file:
    :return: new document instance
    """
    return Document.objects.create(
        crawl_date=timezone.now(),
        pub_date=timezone.now(),
        pub_date_confident=False,
        title=title,
        type=d_type,
        file=d_file
    )


def create_image(name, i_file):
    """
    create a image with the given 'name' and 'title'.
    Args:
        name:
        i_file:

    Returns: new image instance

    """
    return Image.objects.create(
        crawl_date=timezone.now(),
        name=name,
        file=i_file
    )


# class FileTests(APITestCase):


class DocumentTest(APITestCase):
    def setUp(self):
        user = create_user("testUser", "testPass")
        file1 = create_file("file1")
        file2 = create_file("file2")
        self.doc1 = create_document("doc1", "html", file1)
        doc2 = create_document("doc2", "other", file2)
        self.user = user

    def test_unicode(self):
        unicode_file = "unicode.txt"
        text = ''
        with open(unicode_file) as f:
            for line in f:
                text += line

        self.doc1.title = text
        self.doc1.save()

        print self.doc1.title
        self.doc1.save()

    def test_query_multi_value_in_type(self):
        response = self.client.get('/documents/?file=1,2')
        self.assertEqual(response.data["count"], 2)


# class ImageTest(APITestCase):


# class CollectionTest(APITestCase):

