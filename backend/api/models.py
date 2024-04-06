from django.contrib.auth.models import User
from django.db import models
    
class Products(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=1000)
    sustainability_factor = models.FloatField()
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    image_link = models.CharField(max_length=10000)

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    expected_time_commitment = models.IntegerField(default=30)
    is_challenging = models.BooleanField(default=False)
    is_community_oriented = models.BooleanField(default=False)
    is_impactful = models.BooleanField(default=False)
    is_learning_task = models.BooleanField(default=False)
    time_accepted = models.DateTimeField(auto_now_add=True)
    time_completed = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    time_completed = models.DateTimeField(null=True, blank=True)
