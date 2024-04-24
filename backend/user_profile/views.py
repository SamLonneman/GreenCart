from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .serializers import UserProfileSerializer


# Get the user profile data
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

# Update the user profile data
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
            try:
                data = self.request.data
                email = data['email']
                UserProfile.objects.filter(user = user).update(email = email)
                user_profile = UserProfile.objects.get(user = user)
                user_profile = UserProfileSerializer(user_profile)
                return Response({'profile': user_profile.data, 'username': str(username)})
            
            except:
                try:
                    data = self.request.data
                    name = data['name']
                    UserProfile.objects.filter(user = user).update(name=name)
                    user_profile = UserProfile.objects.get(user = user)
                    user_profile = UserProfileSerializer(user_profile)
                    return Response({'profile': user_profile.data, 'username': str(username)})
                
                except:
                    return Response({'error': 'Error updating user profile'})

# Update the user preference data
class UpdateUserPreferenceView(APIView):
    def put(self, request, format=None):
        
        try:
            # Get user and username
            user = self.request.user
            username = user.username
            data = self.request.data

            # Assign all user preferences to be based on incoming data
            age = int(data['age'])
            isVegetarian = data['isVegetarian']
            isVegan = data['isVegan']
            isGlutenFree = data['isGluten']
            isPescatarian = data['isPescatarian']
            allergies = data['allergies']
            financiallimitation = data['financiallimitation'] 
            transportpreferences = data['transportpreferences'] 
            energyavailability = data['energyavailability'] 
            wastemanagement = data['wastemanagement'] 
            waterusage = data['waterusage']
            householdsize = int(data['householdsize'])
            timecommitment = data['timecommitment']
            challengepreference = int(data['challengepreference'])
            communitybias = int(data['communitybias'])
            impactbias = int(data['impactbias'])
            learningbias = int(data['learningbias'])

            # Assign time based on time commitment
            match data['timecommitment']:
                case '1-3 hours':
                    _time = 90
                case '4-7 hours':
                    _time = 330
                case '7-10 hours':
                    _time = 510
                case '> 10 hours':
                    _time = 600

            # Update user profile with new preferences
            UserProfile.objects.filter(user = user).update(
                age = age, 
                isVegetarian = isVegetarian, 
                isVegan = isVegan,
                isGlutenFree = isGlutenFree,
                isPescatarian = isPescatarian, 
                allergies = allergies,
                financiallimitation = financiallimitation, 
                transportpreferences = transportpreferences, 
                energyavailability = energyavailability, 
                wastemanagement = wastemanagement, 
                waterusage = waterusage, 
                householdsize = householdsize, 
                timecommitment = timecommitment,
                time = _time,
                challengepreference = challengepreference, 
                communitybias = communitybias, 
                impactbias = impactbias, 
                learningbias = learningbias
            )

            # Get updated user profile
            user_profile = UserProfile.objects.get(user = user)
            user_profile = UserProfileSerializer(user_profile)

            # Return updated user profile
            return Response({'profile': user_profile.data, 'username': str(username)})
        
        # Error handling
        except:
            return Response({'error': 'Error updating user profile'})
