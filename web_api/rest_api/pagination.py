from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Document

class ImageResultsPagination(PageNumberPagination):
    """
        Pagination class for displaying image results
    """
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 1000


class DocumentsResultsPagination(PageNumberPagination):
    """
        Pagination class for displaying document results
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
    def get_paginated_response(self, data):
        querySet = Document.objects.all().order_by('type').values_list('type', flat=True).distinct()
        types = querySet.order_by('type').values_list('type', flat=True).distinct()
        domain = querySet.order_by('domain').values_list('domain', flat=True).distinct()
        crawl_years = querySet.dates('crawl_date', 'year', order='DESC')
        pub_years = querySet.dates('pub_date', 'year', order='DESC')

        return Response({
            "count": self.page.paginator.count,
            "size": self.page_size,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            "types": types,
            "domains": domain,
            "crawl_years": [date.year for date in crawl_years],
            "pub_years": [date.year for date in pub_years],
        })
