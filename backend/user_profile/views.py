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
