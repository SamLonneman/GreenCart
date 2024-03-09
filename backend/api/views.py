import os
from django.conf import settings
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.generic import View
from rest_framework import generics
from .serializers import ProductSerializer, UserSerializer
from .models import Products

class ViewAllProducts(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()

class ViewUsers(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ReactAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                You need to build the React app before you can serve it.
                """,
                status=501,
            )

def serve_file(request, file):
    with open(os.path.join(settings.REACT_APP_DIR, 'build', file), 'rb') as f:
        return HttpResponse(f)
