from django.shortcuts import render, redirect
from django.http import HttpResponse


from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.http import JsonResponse

from django.core.mail import send_mail
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.
def index(request):
    print("❌ index")
    return render(request, 'index.html')

def home(request):
    # print("❌, home")
    # if request.method == 'POST':
    #         try:
    #             user = User.objects.get(id = id)

    #             if user is None:
    #                 return JsonResponse({'error': 'Invalid credentials'}, status=400)
    #         except User.DoesNotExist:
    #             return JsonResponse({'error': 'Invalid credentials'}, status=400)
    # if request.method == 'GET':
    #     return render(request, 'main/home.html')
    return render(request, 'main/home.html')

def profile(request, id):
    return render(request, 'main/profile.html')

def match_history(request, id):
    return render(request, 'main/match_history.html')

def tournaments(request, id):
    return render(request, 'main/tournaments.html')

@csrf_exempt
def settings(request):
    if request.method == 'GET':
        return render(request, 'main/settings.html')

@csrf_exempt
def check_settings(request, id):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=id)
            if user:
                return JsonResponse({'username': user.username})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def change_settings(request, id):
    if request.method == 'POST':
            
            # Get the email from the JSON data
            data = json.loads(request.body)

            # get data and send to User model
            name = data.get('name')
            username = data.get('username')
            email = data.get('email')
            pass1 = data.get('password')

            try:
                user = User.objects.get(id = id)

                if user is not None:
                    user.first_name = name
                    user.username = username
                    user.email = email
                    user.password = pass1
                    # user.save()
                    return JsonResponse({'message': 'Change successful'}, status=200)
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=400)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return render(request, 'main/settings.html')

@csrf_exempt
def delete_account(request, id):
    if request.method == 'POST':
            try:
                user = User.objects.get(id = id)
                if user is not None:
                    data = json.loads(request.body)
                    refresh = data.get('refresh')
                    token = RefreshToken(refresh)
                    token.blacklist()
                    print("Token", token)
                    # user.delete()
                    return JsonResponse({'message': 'Delete successful'}, status=200)
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=400)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return render(request, 'main/settings.html')
