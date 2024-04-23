from datetime import datetime
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.conf import settings
from django.core.mail import send_mail

from .models import Products, Task
from .serializers import ProductSerializer, TaskSerializer
from .actions import calculate_stats


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
        return Products.objects.filter(name__contains=query).order_by('id')

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

# Get overdue tasks in order of most overdue
@permission_classes([IsAuthenticated])
class GetOverdueTasksView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        tasks = user.task_set.filter(is_accepted=True, is_completed=False, due_date__lt=timezone.now()).order_by('due_date')
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

# Accept a task suggested by the AI
@permission_classes([IsAuthenticated])
class AcceptTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.is_accepted = True
        task.accepted_date = datetime.now()
        task.save()
        return Response({'message': 'Task accepted successfully'})

# Mark a task as completed
@permission_classes([IsAuthenticated])
class CompleteTaskView(APIView):
    def post(self, request, format=None):
        # Set task as completed, set completion date
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.is_completed = True
        task.completed_date = datetime.now()
        task.save()

        # Dynamically update user profile points based on task attributes
        user_profile = self.request.user.userprofile
        user_profile.time += task.expected_time_commitment
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
    
# Manually create a task and automatically accept it
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

# Delete a task
@permission_classes([IsAuthenticated])
class DeleteTaskView(APIView):
    def post(self, request, format=None):
        task_id = request.data.get('id')
        task = Task.objects.get(id=task_id)
        task.delete()
        return Response({'message': 'Task deleted successfully'})

# Get statistics for progress tracking
@permission_classes([IsAuthenticated])
class GetStatsView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        return Response({"stats": calculate_stats(user)})

# Email task progress to provided recipient, or to self if body is empty
@permission_classes([IsAuthenticated])
class EmailProgressView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        name = user.userprofile.name if user.userprofile.name else user.username

        # If sending to a friend
        if 'recipient' in request.data:
            recipient = request.data['recipient']
            subject = f"{name}'s GreenCart Progress Report"
            greeting = 'Greetings!'
            introduction = f"Your friend, {name}, wants you to see their latest GreenCart progress tracking report. Take a look!"
            closing = f"Try GreenCart today to join {name} in building a more sustainable lifestyle!"
        
        # If sending to self
        else:
            if not user.userprofile.email:
                return Response({'message': 'Please update your user profile to include an email account.'}, status=status.HTTP_400_BAD_REQUEST)
            recipient = user.userprofile.email
            subject = 'Greencart Progress Report'
            greeting = f"Hello {name},"
            introduction = 'You recently requested a copy of your GreenCart Progress Tracking Report. Here are your latest statistics:'
            closing = 'Keep up the good work!'

        # Calculate progress tracking statistics
        stats = calculate_stats(user)
        # Nicely format average turnaround time
        if stats['average_turnaround_time']:
            days = int(stats['average_turnaround_time'])
            hours = int((stats['average_turnaround_time'] - days) * 24)
            if days != 0:
                stats['average_turnaround_time'] = f"{days} days {hours} hours"
            else:
                stats['average_turnaround_time'] = f"{hours} hours"
        
        # Construct email body
        body = f"""
        <html>
            <head>
                <style>
                    .header-footer {{
                        font-size: 24px;
                        color: green;
                        text-align: center;
                        padding: 10px;
                        background-color: #f2f2f2;
                    }}
                    body {{
                        font-family: Arial, sans-serif;
                        color: #333;
                        padding: 20px;
                    }}
                    table {{
                        width: 80%;
                        max-width: 600px;
                        border-collapse: collapse;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 20px;
                        margin-bottom: 40px;
                    }}
                    th, td {{
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                        text-align: left;
                    }}
                </style>
            </head>
            <body>
                <div class="header-footer">GreenCart</div>
                <p><br>{greeting}</p>
                <p>{introduction}</p>
                <table>
                    <tr><th>Statistic</th><th>Value</th></tr>
                    <tr><td>Number of tasks accepted</td><td>{stats['num_tasks_accepted']} tasks</td></tr>
                    <tr><td>Number of tasks completed</td><td>{stats['num_tasks_completed']} tasks</td></tr>
                    <tr><td>Average turnaround time</td><td>{stats['average_turnaround_time']}</td></tr>
                    <tr><td>Number of community-oriented tasks</td><td>{stats['num_community_oriented']} tasks</td></tr>
                    <tr><td>Number of learning tasks</td><td>{stats['num_learning']} tasks</td></tr>
                    <tr><td>Number of impactful tasks</td><td>{stats['num_impactful']} tasks</td></tr>
                    <tr><td>Number of challenging tasks</td><td>{stats['num_challenging']} tasks</td></tr>
                </table>
                <p>{closing}</p>
                <p>Best,</p>
                <p>The GreenCart Team<br></p>
                <div class="header-footer">GreenCart</div>
            </body>
        </html>
        """

        # Send email
        send_mail(
            subject=subject,
            message='',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[recipient],
            html_message=body
        )

        # Return response
        return Response({'message': f'Progress report sent successfully to {recipient}.'})
