from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('accounts/', include('accounts.urls')),
    path('profile/', include('user_profile.urls')),   
    path('api/', include('api.urls')),
    path('AIapi/', include('AIapi.urls'))
]

# Allow backend to serve frontend
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
