import datetime

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Products, Task
from .serializers import ProductSerializer, TaskSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

@permission_classes([AllowAny])
class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        query = self.request.GET.get('contains', '')
        return Products.objects.filter(name__icontains=query).order_by('id')
    
@permission_classes([IsAuthenticated])
class GetTasksView(APIView):
    def get(self, request, format=None):
            user = self.request.user
            tasks = Task.objects.filter(user=user)
            tasks = TaskSerializer(tasks, many=True)
            return Response({'tasks': tasks.data})


@permission_classes([IsAuthenticated])
class CreateTaskView(APIView):
    def post(self, request, format=None):
        task = TaskSerializer(data=request.data)
        if task.is_valid():
            task.save(user=self.request.user)
            return Response(task.data, status=status.HTTP_201_CREATED)
        return Response(task.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class CompleteTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.is_completed = True
        task.time_completed = datetime.now()
        task.save()
        return Response({'message': 'Task updated successfully'})
    
@permission_classes([IsAuthenticated])
class DeleteTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.delete()
        return Response({'message': 'Task deleted successfully'})
