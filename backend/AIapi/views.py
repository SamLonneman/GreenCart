from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

import json
from django.http import JsonResponse
import google.generativeai as genai
from .models import AIapi

# import /api/models.py to access the Task model
from api.models import Task
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
            text = """ You are recommending a set of distinct tasks to a person.
            These tasks should provide actionable and specific targets/goals that an individual can accomplish within reasonable time (1 month or less). 
            These goals should help the individual live a more sustainable and healthy lifestyle. 
            There should be 3 tasks in this set. Each task should be a single, individual action that has a clear start and end. Tasks may also include research or learning. 
            Clearly separate these element such that it is clear how to parse data from the response.
            Parse Data as follows: Task 1: Task 1 Description#Task 1 flags#Task 2: Task 2 Description#Task 2 flags#Task 3: Task 3 Description#Task 3flags. You must follow this format strictly.
            The flags section should contain certain elements of the task that are important. These are encoded in the following manner:
            1. Time Commitment: This is the amount of time that the task will take to complete. This should be a number in minutes.
            2. Challenge Level: This is the difficulty of the task. This should be 0 or 1, where 0 is easy and 1 is hard.
            3. Community Involvement: This is the amount of community involvement in the task. This should be 0 or 1, where 0 is low and 1 is high.
            4. Impact: This is the impact of the task. This should be 0 or 1, where 0 is low and 1 is high.
            5. Learning: This is whether or not the task is primarily a learning task. 0 represents action tasks, 1 represents learning tasks.
            Each flag should be separated by a comma. 
            Based on the following information, tailor these recommendations. Recommendations do not need to directly reference the user profile, 
            but the recommendations should not violate any of the user's prefernces: 
            """
            # TODO: Based on the user profile, append the user's preferences to the text variable. not doing this makes the recommendations suck    
            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(text)
            
            #user = request.user
            #AIapi.objects.create(user=user, text_input=text, generated_text=response.text)
            return Response({'text': response.text})
        