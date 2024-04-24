from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Products, Task


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = ['user']
