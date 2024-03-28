from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

from .models import Products
from .serializers import ProductSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

@permission_classes([AllowAny])
class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        query = self.request.GET.get('contains', '')
        return Products.objects.filter(name__icontains=query).order_by('id')
