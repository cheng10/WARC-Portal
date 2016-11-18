from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, filters, status
from serializers import *
from models import *
from pagination import *
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django_filters import Filter, FilterSet, DateFilter, NumberFilter
from django_filters.filters import Lookup
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import detail_route, list_route


@permission_classes((IsAdminUser, ))
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be **viewed** or **edited** by **admin**.

    Returns a list of all users in the system.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


@permission_classes((IsAdminUser, ))
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be **viewed** or **edited** by **admin**.

    Returns a list of all groups in the system.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ListFilter(Filter):
    def filter(self, qs, value):
        value_list = value.split(u',')
        return super(ListFilter, self).filter(qs, Lookup(value_list, 'in'))


class DocumentFilter(FilterSet):
    type = ListFilter(name='type')
    file = ListFilter(name='file')
    domain = ListFilter(name='domain')
    pub_start_date = DateFilter(name='pub_date', lookup_expr='gt')
    pub_end_date = DateFilter(name='pub_date', lookup_expr='lt')
    pub_year = NumberFilter(name='pub_date', lookup_expr='year')
    crawl_start_date = DateFilter(name='crawl_date', lookup_expr='gt')
    crawl_end_date = DateFilter(name='crawl_date', lookup_expr='lt')
    crawl_year = NumberFilter(name='crawl_date', lookup_expr='year')

    class Meta:
        model = Document
        fields = ['type', 'file', 'domain', 'pub_start_date', 'pub_end_date',
                  'crawl_start_date', 'crawl_end_date', 'pub_year', 'crawl_year']


class ImageFilter(FilterSet):
    file = ListFilter(name='file')
    domain = ListFilter(name='domain')

    class Meta:
        model = Image
        fields = ['file', 'domain']


@permission_classes((AllowAny, ))
class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows documents to be **viewed** by **anyone**,
    with the functionality of **ordering**, **searching** and **filtering**.

    Returns a list of all documents in the system.
    """
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, filters.DjangoFilterBackend,)
    ordering_fields = ('id', 'pub_date_confident', 'pub_date', 'crawl_date')
    search_fields = ('title', 'content')
    filter_class = DocumentFilter


@permission_classes((AllowAny, ))
class ImageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows images to be **viewed** by **anyone**,
    with the functionality of **ordering**, **searching** and **filtering**.

    Returns a list of all images in the system.
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    pagination_class = ImageResultsPagination
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, filters.DjangoFilterBackend,)
    ordering_fields = ('id', 'crawl_date')
    search_fields = ('name', 'detail')
    filter_class = ImageFilter


@permission_classes((AllowAny, ))
class WarcFileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows WarcFiles to be **viewed** by **anyone**.

    Returns a list of all warc files in the system.
    """
    queryset = WarcFile.objects.all()
    serializer_class = WarcFileSerializer

    @detail_route(methods=['get'])
    def doc_list(self, request, pk):
        docs = WarcFile.objects.get(pk=pk).document_set.all()

        page = self.paginate_queryset(docs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(docs, many=True)
        return Response(serializer.data)

        # serializer = DocumentSerializer(data=request.data)
        # if serializer.is_valid():
        #     warc_file = WarcFile.objects.get(pk=pk)
        #     docs = warc_file.document_set.all()
        #     serializer = DocumentSerializer(docs)
        #     return Response(serializer.data)
        # else:
        #     return Response(serializer.errors,
        #                     status=status.HTTP_400_BAD_REQUEST)

    # @list_route()
    # def docs(self, request):
    #     docs = WarcFile.objects.get(pk=3).document_set.all()
    #
    #     page = self.paginate_queryset(docs)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(docs, many=True)
    #     return Response(serializer.data)


@permission_classes((IsAuthenticated, ))
class CollectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows collations to be **viewed** only by by **authenticated user**,
    or to be **created** by the **current user**.

    Returns a list of all collection in the system.
    """
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    # def get_queryset(self):
    #     """
    #     This view should return a list of all the collections
    #     for the currently authenticated user.
    #     """
    #     user = self.request.user
    #     return Collection.objects.filter(warcuser=user)


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)


@csrf_exempt
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)
