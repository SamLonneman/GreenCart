from django.urls import path
from .views import (
    ProductList,
    GetPendingTasksView,
    GetCompletedTasksView,
    GetOverdueTasksView,
    GetAllTasksView,
    CreateTaskView,
    CompleteTaskView,
    DeleteTaskView,
    AcceptTaskView,
)


urlpatterns = [
    path('products', ProductList.as_view()),
    path('tasks/pending', GetPendingTasksView.as_view()),
    path('tasks/completed', GetCompletedTasksView.as_view()),
    path('tasks/overdue', GetOverdueTasksView.as_view()),
    path('tasks/all', GetAllTasksView.as_view()),
    path('tasks/accept', AcceptTaskView.as_view()),
    path('tasks/reject', DeleteTaskView.as_view()),
    path('tasks/complete', CompleteTaskView.as_view()),
    path('tasks/create', CreateTaskView.as_view()),
    path('tasks/delete', DeleteTaskView.as_view())
]