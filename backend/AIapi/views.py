from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

import json
from django.http import JsonResponse
import google.generativeai as genai
from .models import AIapi
import os
import environ
env = environ.Env()
environ.Env.read_env()
# Create your views here.
GEMINI_API_KEY= env('GOOGLE_API_KEY')
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
        