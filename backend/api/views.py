from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductSerializer
from .models import Products

class ProductView(generics.CreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer