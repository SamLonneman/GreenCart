from django.db import models

# NOTE: User model is already defined in django.contrib.auth.models
    
class Products(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=1000)
    sustainability_factor = models.IntegerField()
    image_link = models.CharField(max_length=10000)
