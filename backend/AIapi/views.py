from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

import json
from django.http import JsonResponse
import google.generativeai as genai

from api.models import Task
from api.serializers import TaskSerializer
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

@permission_classes([IsAuthenticated])
class GenerateTaskView(APIView):
    def get(self, request, format=None):
        task = Task()
        task.user = self.request.user
        # TODO: REPLACE SAMPLE BELOW WITH AI GENERATED DATA
        task.title = 'AI Generated Title'
        task.description = 'AI generated description...'
        task.expected_time_commitment = 15
        task.is_challenging = True
        task.is_community_oriented = False
        task.is_impactful = True
        task.is_learning_task = False
        # You may also override task.due_date if you want, otherwise it defaults to a week from now
        task.save()
        return Response({'task': TaskSerializer(task).data}, status=status.HTTP_201_CREATED)
