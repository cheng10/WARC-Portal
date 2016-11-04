from rest_framework.pagination import PageNumberPagination


class ImageResultsPagination(PageNumberPagination):
    """
        Pagination class for displaying image results
    """
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 1000