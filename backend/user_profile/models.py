from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user information
    name = models.CharField(max_length=255, default='')
    email = models.EmailField(max_length=255, default='')
    # whoever is on image duty, please make sure to add a default image and make this work
    # you TOTALLY need to install pillow for this to work
    # profileimage = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')
    # user data
    age = models.IntegerField(default=18)
    isVegetarian = models.BooleanField(default=False)
    isVegan = models.BooleanField(default=False)
    isGlutenFree = models.BooleanField(default=False)
    isPescatarian = models.BooleanField(default=False)
    allergies = models.CharField(max_length=255, default='')
    financiallimitation = models.BooleanField(default=False)
    transportpreferences = models.CharField(max_length=255, default='')
    energyavailability = models.CharField(max_length=255, default='')
    wastemanagement = models.CharField(max_length=255, default='')
    shoppingpreferences = models.CharField(max_length=255, default='')
    waterusage = models.CharField(max_length=255, default='')
    householdsize = models.IntegerField(default=1)
    # Variable Preferences!
    timecommitment = models.IntegerField(default=30)
    challengepreference = models.IntegerField(default=1)
    communitybias = models.IntegerField(default=1)
    impactbias = models.IntegerField(default=1)
    learningbias = models.IntegerField(default=1)






    def __str__(self):
        return self.name
