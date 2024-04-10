from django.urls import path
from .views import (
    ProductList,
    GetPendingTasksView,
    GetCompletedTasksView,
    GetAllTasksView,
    CreateTaskView,
    CompleteTaskView,
    DeleteTaskView,
    AcceptTaskView,
    RejectTaskView,
)

urlpatterns = [
    path('products', ProductList.as_view()),
    path('tasks/pending', GetPendingTasksView.as_view()),
    path('tasks/completed', GetCompletedTasksView.as_view()),
    path('tasks/all', GetAllTasksView.as_view()),
    path('tasks/accept', AcceptTaskView.as_view()),
    path('tasks/reject', RejectTaskView.as_view()),
    path('tasks/complete', CompleteTaskView.as_view()),
    path('tasks/create', CreateTaskView.as_view()),
    path('tasks/delete', DeleteTaskView.as_view())
]
