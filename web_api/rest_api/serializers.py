from django.contrib.auth.models import User, Group
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import serializers
import json
import ast
from models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    The serializer for user.
    """
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """
    The serializer for group.
    """
    class Meta:
        model = Group
        fields = ('url', 'name')


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password',)
        extra_kwargs = {'password': {'write_only': True}}


# class CreateUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('email', 'username', 'password')
#         extra_kwargs = {'password': {'write_only': True}}
#
#     def create(self, validated_data):
#         user = User(
#             email=validated_data['email'],
#             username=validated_data['username']
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user


class DocumentSerializer(serializers.ModelSerializer):
    """
    The serializer for document.
    """
    file = serializers.CharField(source='file.name')

    class Meta:
        model = Document
        fields = ('url', 'title', 'domain', 'file', 'crawl_date', 'pub_date', 'pub_date_confident',
                  'type', 'link', 'detail', 'content')


class WarcFileSerializer(serializers.ModelSerializer):
    """
    The serializer for warc file.
    """
    class Meta:
        model = WarcFile
        fields = ('url', 'name')


class CollectionSerializer(serializers.ModelSerializer):
    """
    The serializer for collection.
    """
    file = WarcFileSerializer(many=True)
    warcuser = serializers.StringRelatedField()

    class Meta:
        model = Collection
        fields = ('url', 'warcuser', 'name', 'detail', 'file')

    def create(self, validated_data):
        """
        Create a new collection for the current authenticated user.
        :param validated_data:
        :return: collation instant
        """
        validated_data = ast.literal_eval(json.dumps(validated_data))

        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        files_data = validated_data.pop('file')
        collection = Collection.objects.create(warcuser=user, **validated_data)
        collection.save()
        for file_data in files_data:
            collection.file.add(WarcFile.objects.get(name=file_data['name']))
            collection.save()

        return collection


class ImageSerializer(serializers.ModelSerializer):
    """
    The serializer for image.
    """
    file = serializers.CharField(source='file.name')

    class Meta:
        model = Image
        fields = ('url', 'name', 'crawl_date', 'detail', 'link', 'file')


class TfIdfSerializer(serializers.ModelSerializer):
    """
    The serializer for tf-tdf score.
    """
    collection_id = CollectionSerializer

    class Meta:
        model = TfIdf
        fields = ('url', 'collection_id', 'score_kv')


# class SnippetSerializer(serializers.Serializer):
#     pk = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(required=False, allow_blank=True, max_length=100)
#     content = serializers.CharField(style={'base_template': 'textarea.html'})
#
#     def create(self, validated_data):
#         """
#         Create and return a new `Snippet` instance, given the validated data.
#         :param validated_data:
#         """
#         return Snippet.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         """
#         Update and return an existing `Snippet` instance, given the validated data.
#         :param validated_data:
#         :param instance:
#         """
#         instance.title = validated_data.get('title', instance.title)
#         instance.content = validated_data.get('content', instance.content)
#         instance.save()
#         return instance


# class SnippetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = ('id', 'title', 'content')
