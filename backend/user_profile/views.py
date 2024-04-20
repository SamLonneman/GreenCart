from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
class GetUserProfileView(APIView):
    def get(self, request, format = None):
        try:
            user = self.request.user
            username = user.username
            user_profile = UserProfile.objects.get(user = user)
            user_profile = UserProfileSerializer(user_profile)
            return Response({'profile': user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'Error getting user profile'})
    
class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            name = data['name']
            email = data['email']

            UserProfile.objects.filter(user = user).update(name = name, email = email)

            user_profile = UserProfile.objects.get(user = user)

            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'Error updating user profile'})


class UpdateUserPreferenceView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            # assign all user preferences to based on incoming data
            age = int(data['age'])
            isVegetarian = data['isVegetarian']
            isVegan = data['isVegan']
            isGlutenFree = data['isGlutenFree']
            isPescatarian = data['isPescatarian']
            fishallergen = data['fishallergen'] 
            dairyallergen = data['dairyallergen'] 
            financiallimitation = data['financiallimitation'] 
            transportpreferences = data['transportpreferences'] 
            energyavailability = data['energyavailability'] 
            wastemanagement = data['wastemanagement'] 
            shoppingpreferences = data['shoppingpreferences']
            waterusage = data['waterusage']
            householdsize = int(data['householdsize'])
            timecommitment = int(data['timecommitment'])
            challengepreference = int(data['challengepreference'])
            communitybias = int(data['communitybias'])
            impactbias = int(data['impactbias'])
            learningbias = int(data['learningbias'])

            # update user profile with new preferences
            UserProfile.objects.filter(user = user).update(age = age, isVegetarian = isVegetarian, isVegan = isVegan, isGlutenFree = isGlutenFree, isPescatarian = isPescatarian, fishallergen = fishallergen, dairyallergen = dairyallergen, financiallimitation = financiallimitation, transportpreferences = transportpreferences, energyavailability = energyavailability, wastemanagement = wastemanagement, shoppingpreferences = shoppingpreferences, waterusage = waterusage, householdsize = householdsize, timecommitment = timecommitment, challengepreference = challengepreference, communitybias = communitybias, impactbias = impactbias, learningbias = learningbias)

            user_profile = UserProfile.objects.get(user = user)

            user_profile = UserProfileSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'Error updating user profile'})
