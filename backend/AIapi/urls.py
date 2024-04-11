from django.urls import path
from .views import GenerateTextView
from .views import GenerateTaskView
# ai time
urlpatterns = [
    path('request', GenerateTextView.as_view()),
    path('generate-task', GenerateTaskView.as_view()),
]