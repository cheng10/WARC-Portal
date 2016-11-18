from django.conf.urls import url, include
from rest_framework import routers
import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'image', views.ImageViewSet)
router.register(r'warcfile', views.WarcFileViewSet)
router.register(r'collection', views.CollectionViewSet)
# router.register(r'collection_docs', views.CollectionDocListViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^docs/', include('rest_framework_docs.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^snippets/$', views.snippet_list),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail),
]