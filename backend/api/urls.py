from django.urls import path, include
from .views import ViewAllProducts, ViewUsers, ReactAppView, serve_file

urlpatterns = [
    path('', ReactAppView.as_view()),
    path('<str:file>', serve_file),
    path('auth/', include('rest_framework.urls')),
    path('api/products/', ViewAllProducts.as_view()),
    path('api/users/', ViewUsers.as_view()),
]
