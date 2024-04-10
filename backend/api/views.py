from datetime import datetime

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Products, Task
from .serializers import ProductSerializer, TaskSerializer


# Pagination settings for product list
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

# Get all products, filter by name if query parameter is provided
@permission_classes([AllowAny])
class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        query = self.request.GET.get('contains', '')
        return Products.objects.filter(name__icontains=query).order_by('id')

# Get pending tasks in order of nearest due date
@permission_classes([IsAuthenticated])
class GetPendingTasksView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        tasks = user.task_set.filter(is_accepted=True, is_completed=False).order_by('due_date')
        tasks = TaskSerializer(tasks, many=True)
        return Response({'tasks': tasks.data})

# Get completed tasks in order of most recently completed
@permission_classes([IsAuthenticated])
class GetCompletedTasksView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        tasks = user.task_set.filter(is_completed=True).order_by('-completed_date')
        tasks = TaskSerializer(tasks, many=True)
        return Response({'tasks': tasks.data})

# Get all tasks in order of most recently accepted
@permission_classes([IsAuthenticated])
class GetAllTasksView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        tasks = user.task_set.filter(is_accepted=True).order_by('-accepted_date')
        tasks = TaskSerializer(tasks, many=True)
        return Response({'tasks': tasks.data})

# Accept a task suggested by the AI (takes unique task id)
@permission_classes([IsAuthenticated])
class AcceptTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.is_accepted = True
        task.accepted_date = datetime.now()
        task.save()
        return Response({'message': 'Task accepted successfully'})

# Reject a task suggested by the AI (takes unique task id)
@permission_classes([IsAuthenticated])
class RejectTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.delete()
        return Response({'message': 'Task rejected successfully'})

# Mark a task as completed (takes unique task id)
@permission_classes([IsAuthenticated])
class CompleteTaskView(APIView):
    def post(self, request, format=None):
        # Update task as completed, set completion date
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.is_completed = True
        task.completed_date = datetime.now()
        task.save()
        # Dynamically update user profile points based on task impact
        user_profile = self.request.user.userprofile
        user_profile.timecommitment += task.expected_time_commitment
        if task.is_challenging:
            user_profile.challengepreference += 1
        if task.is_community_oriented:
            user_profile.communitybias += 1
        if task.is_impactful:
            user_profile.impactbias += 1
        if task.is_learning_task:
            user_profile.learningbias += 1
        user_profile.save()
        return Response({'message': 'Task completed successfully'})
    
# Manually create a task and assign it to the current user
@permission_classes([IsAuthenticated])
class CreateTaskView(APIView):
    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save(user=self.request.user)
            task.is_accepted = True
            task.accepted_date = datetime.now()
            task.save()
            return Response({"task": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a task (takes unique task id)
@permission_classes([IsAuthenticated])
class DeleteTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.delete()
        return Response({'message': 'Task deleted successfully'})
