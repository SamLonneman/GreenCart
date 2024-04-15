from django.urls import path
from .views import GenerateTextView, GenerateTaskView



urlpatterns = [
    path('request', GenerateTextView.as_view()),
    path('generate-task', GenerateTaskView.as_view()),
]