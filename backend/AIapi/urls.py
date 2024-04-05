from django.urls import path
from .views import GenerateTextView
# ai time
urlpatterns = [
    path('request', GenerateTextView.as_view()),
]