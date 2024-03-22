from django.urls import path
from .views import ProductList

urlpatterns = [
    path('api/products/', ProductList.as_view())
]
