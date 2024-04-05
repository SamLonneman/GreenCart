from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class AIapi(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    text_input = models.CharField(max_length=1024, default='')
    generated_text = models.CharField(max_length=1024, default='')

    def __str__(self):
        return self.name