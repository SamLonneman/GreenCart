from django.db import models

# NOTE: User model is already defined in django.contrib.auth.models
    
class Products(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.IntegerField()
    sustainability_factor = models.IntegerField()
    image_link = models.CharField(max_length=10000)
