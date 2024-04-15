import google.generativeai as genai


from django.shortcuts import render

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.http import HttpResponse
import json
from rest_framework import status


# import /api/models.py to access the Task model
from api.models import Task
from api.serializers import TaskSerializer

from user_profile.models import UserProfile
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
            #text = data['text']
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
            Each flag should be separated by a comma. It may look like this for example: 30,1,0,1,0 (do not include brackets or spaces between the numbers)
            Based on the following information, tailor these recommendations. Recommendations do not need to directly reference the user profile, 
            but the recommendations should not violate any of the user's preferences/allergens. Ignore empty fields in the user profile.: 
            """
            # TODO: Based on the user profile, append the user's preferences to the text variable. not doing this makes the recommendations suck    
            # Append user data
            user = self.request.user
            user_profile = UserProfile.objects.get(user = user)
            text += f"""User Profile:
            Age: {user_profile.age}
            Vegetarian: {user_profile.isVegetarian}
            Vegan: {user_profile.isVegan}
            Gluten Free: {user_profile.isGlutenFree}
            Pescatarian: {user_profile.isPescatarian}
            Fish Allergen: {user_profile.fishallergen}
            Dairy Allergen: {user_profile.dairyallergen}
            Financial Limitation: {user_profile.financiallimitation}
            Transport Preferences: {user_profile.transportpreferences}
            Energy Availability: {user_profile.energyavailability}
            Waste Management: {user_profile.wastemanagement}
            Shopping Preferences: {user_profile.shoppingpreferences}
            Water Usage: {user_profile.waterusage}
            Household Size: {user_profile.householdsize}
            User Time Commitment (in minutes, daily): {user_profile.timecommitment}
            User Challenge Preference (Larger = greater desire for challenging tasks): {user_profile.challengepreference}
            User Community Bias (Larger = greater desire for community tasks): {user_profile.communitybias}
            User Impact Bias (Larger = greater desire for high impact tasks): {user_profile.impactbias}
            User Learning Bias (Larger = greater desire for learning): {user_profile.learningbias}
            """
            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(text)
            
            #user = request.user
            #AIapi.objects.create(user=user, text_input=text, generated_text=response.text)
            return Response({'text': response.text})

# Create a new task using AI generated data
@permission_classes([IsAuthenticated])
class GenerateTaskView(APIView):
    def get(self, request, format=None):
        text = """ You are recommending a set of tasks to a person.
            These tasks should provide actionable and specific targets/goals that an individual can accomplish within reasonable time. 
            These goals should help the individual live a more sustainable and healthy lifestyle. 
            There should be 3 tasks in this set. Each task should be a single, individual action that has a clear start and end. Tasks may also include research or learning. 
            For each task, provide a relevant name of the task (2-5 words) and a brief description (2-4 sentences). DO NOT NAME THE TASKS "Task 1", "Task 2", etc.
            Provide Data as follows: Name of task 1#Task 1 Description#Task 1 flags#Task 2 Name#Task 2 Description#Task 2 flags#Task 3 Name#Task 3 Description#Task 3 flags. You must follow this format strictly. The words "Task Description" and "Task flags" should not be included in the response.
            The flags section should contain certain elements of the task that are important. These are encoded in the following manner:
            1. This is the amount of time that the task will take to complete. This should be a number in minutes.
            2. Level: This is the difficulty of the task. This should be 0 or 1, where 0 is easy and 1 is hard.
            3. This is the amount of community involvement in the task. This should be 0 or 1, where 0 is low and 1 is high.
            4. This is the impact of the task. This should be 0 or 1, where 0 is low and 1 is high.
            5. This is whether or not the task is primarily a learning task. 0 represents action tasks, 1 represents learning tasks.
            Each flag should be separated by a comma. DO NOT LABEL THE FLAGS. 
            An example task may look like so: Energy Tracking#Track your energy usage for a week. This will help you understand your energy consumption and identify areas where you can reduce your usage.#30,1,0,1,0
            Based on the following information, tailor these recommendations. 
            The recommendations should not violate any of the user's preferences/allergens. Ignore empty fields in the user profile.: 
            """
        user = self.request.user
        user_profile = UserProfile.objects.get(user = user)
        text += f"""User Profile:
        Age: {user_profile.age}
        Vegetarian: {user_profile.isVegetarian}
        Vegan: {user_profile.isVegan}
        Gluten Free: {user_profile.isGlutenFree}
        Pescatarian: {user_profile.isPescatarian}
        Fish Allergen: {user_profile.fishallergen}
        Dairy Allergen: {user_profile.dairyallergen}
        Financial Limitation: {user_profile.financiallimitation}
        Transport Preferences: {user_profile.transportpreferences}
        Energy Availability: {user_profile.energyavailability}
        Waste Management: {user_profile.wastemanagement}
        Shopping Preferences: {user_profile.shoppingpreferences}
        Water Usage: {user_profile.waterusage}
        Household Size: {user_profile.householdsize}
        User Time Commitment (in minutes, daily): {user_profile.timecommitment}
        User Challenge Preference (Larger = greater desire for challenging tasks): {user_profile.challengepreference}
        User Community Bias (Larger = greater desire for community tasks): {user_profile.communitybias}
        User Impact Bias (Larger = greater desire for high impact tasks): {user_profile.impactbias}
        User Learning Bias (Larger = greater desire for learning): {user_profile.learningbias}
        """
        model = genai.GenerativeModel("gemini-pro")
        
        response = model.generate_content(text)
        while (response.text.count('#') != 8):
            response = model.generate_content(text)
        #print(response.text)
        tasks = response.text.split('#')
        #print(tasks)
        taskList = []
        for i in range(0, len(tasks), 3):
            task = Task()
            task.user = user
            #print(tasks[i])
            task.title = tasks[i]
            #print(tasks[i+1])
            task.description = tasks[i+1]
            flags = tasks[i+2].split(',')
            #print(flags)
            task.expected_time_commitment = int(flags[0])
            task.is_challenging = True if flags[1] == '1' else False
            task.is_community_oriented = True if flags[2] == '1' else False
            task.is_impactful = True if flags[3] == '1' else False
            task.is_learning_task = True if flags[4] == '1' else False
            #task.due_date = get_week_from_now()
            #print(task)
            task.save()
            taskList.append(task)
        response = HttpResponse(json.dumps({'task1': TaskSerializer(taskList[0]).data, 'task2': TaskSerializer(taskList[1]).data, 'task3': TaskSerializer(taskList[2]).data}), content_type="application/json")
        return response
        return Response({'task 1': TaskSerializer(taskList[0]).data},{'task 2': TaskSerializer(taskList[1]).data},{'task 3': TaskSerializer(taskList[2]).data}, status=status.HTTP_201_CREATED)