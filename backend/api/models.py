from django.db import models
    
class Products(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=1000)
    sustainability_factor = models.FloatField()
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    image_link = models.CharField(max_length=10000)
