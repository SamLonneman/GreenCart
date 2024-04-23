from django.urls import path, include
from .views import GetUserProfileView, UpdateUserProfileView, UpdateUserPreferenceView

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
    path('updatepreference', UpdateUserPreferenceView.as_view())
]