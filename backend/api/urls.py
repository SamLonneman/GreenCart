from django.urls import path
from .views import GetTasksView, CreateTaskView, CompleteTaskView, DeleteTaskView, ProductList

urlpatterns = [
    path('products', ProductList.as_view()),
    path('tasks', GetTasksView.as_view()),
    path('tasks/create', CreateTaskView.as_view()),
    path('tasks/complete', CompleteTaskView.as_view()),
    path('tasks/delete', DeleteTaskView.as_view())
]
