from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.IntegerField()
    sustainability_factor = models.IntegerField()
    image_link = models.CharField(max_length=10000)
