from datetime import datetime, timedelta
from django.contrib.auth.models import User
from django.db import models

class Products(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=1000)
    sustainability_factor = models.FloatField()
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    image_link = models.CharField(max_length=10000)

# Helper function for setting due date to a week from now by default
def get_week_from_now():
    return datetime.now() + timedelta(weeks=1)

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    expected_time_commitment = models.IntegerField(default=30)
    is_challenging = models.BooleanField(default=False)
    is_community_oriented = models.BooleanField(default=False)
    is_impactful = models.BooleanField(default=False)
    is_learning_task = models.BooleanField(default=False)
    due_date = models.DateTimeField(default=get_week_from_now)
    is_accepted = models.BooleanField(default=False)
    accepted_date = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    completed_date = models.DateTimeField(null=True, blank=True)
