from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

import json
from django.http import JsonResponse
import google.generativeai as genai
from .models import AIapi
# Create your views here.
GEMINI_API_KEY= "AIzaSyB0absPY-ad5UaD9Bv6ygZAaUAcf4P0p7Q"
genai.configure(api_key = GEMINI_API_KEY)
class GenerateTextView(APIView):
    def post(self, request, format=None):
            data = self.request.data
            text = data['text']
            #print(text)
            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(text)
            #user = request.user
            #AIapi.objects.create(user=user, text_input=text, generated_text=response.text)
            return Response({'generated_text': response.text})
        