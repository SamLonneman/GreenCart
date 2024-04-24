from django.urls import path

from .views import (GetUserProfileView, UpdateUserPreferenceView, UpdateUserProfileView)

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
    path('updatepreference', UpdateUserPreferenceView.as_view())
]
