from django.contrib.auth.models import User, Group
from rest_framework import serializers
from models import Snippet, Document


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class DocumentSerializer(serializers.ModelSerializer):

    file = serializers.CharField(source='file.name')

    class Meta:
        model = Document
        fields = ('file', 'crawl_date', 'type', 'link', 'detail', 'content')

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


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'content')
