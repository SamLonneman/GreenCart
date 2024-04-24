from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user information
    name = models.CharField(max_length=255, default='')
    email = models.EmailField(max_length=255, default='')
    age = models.IntegerField(default=18)
    isVegetarian = models.BooleanField(default=False)
    isVegan = models.BooleanField(default=False)
    isGlutenFree = models.BooleanField(default=False)
    isPescatarian = models.BooleanField(default=False)
    allergies = models.CharField(max_length=255, default='')
    financiallimitation = models.IntegerField(default=0)
    transportpreferences = models.CharField(max_length=255, default='')
    energyavailability = models.CharField(max_length=255, default='')
    wastemanagement = models.CharField(max_length=255, default='')
    waterusage = models.CharField(max_length=255, default='')
    householdsize = models.IntegerField(default=1)
    # Variable Preferences!
    timecommitment = models.CharField(default='1-3 hours')
    time = models.IntegerField(default=90)
    challengepreference = models.IntegerField(default=1)
    communitybias = models.IntegerField(default=1)
    impactbias = models.IntegerField(default=1)
    learningbias = models.IntegerField(default=1)

    def __str__(self):
        return self.name
