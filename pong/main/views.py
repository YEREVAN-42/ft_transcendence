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
from game.models import GameInvite, PongGame, Player, History

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

@csrf_exempt
def profile(request):
    return render(request, 'main/profile.html')

@csrf_exempt
def language(request):
    if request.method == 'PUT':
        try:
            player = Player.objects.get(id=id)
            if player is None:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
            data = {
                'language': player.language,
            }
            return JsonResponse(data)
        except Player.DoesNotExist:
            return JsonResponse({'error': 'Player not found'}, status=404)


@csrf_exempt
def profile_info(request, id):
    print("id", id)
    if request.method == 'GET':
        return JsonResponse({'info': 'Profile info'}, status=200)
        # try:
        #     user = User.objects.get(id=id)
        #     if user is None:
        #         return JsonResponse({'error': 'Invalid credentials'}, status=400)
        #     print("request", request.method)
        #     player = Player.objects.get(id=id)
        #     if player is None:
        #         return JsonResponse({'error': 'Invalid credentials'}, status=400)
        #     data = {
        #         'username': user.username,
        #         'wins': player.wins,
        #         'loses': player.loses,
        #     }
        #     print("Data", data)
        #     return JsonResponse(data)
        # except Player.DoesNotExist:
        #     return JsonResponse({'error': 'Player not found'}, status=404)   
            

@csrf_exempt
def match_history(request, id):
    return render(request, 'main/match_history.html')

@csrf_exempt
def history(request, id):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=id)
            if user is None:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
            player = Player.objects.get(id=id)
            if player is None:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
            
            history = History.objects.get(player=id)
            print("History", history)
            if history is None:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
            data = {
                'username': user.username,
                'image': player.image,
                'game_mode': history.game_mode,
                'result': history.result,
                'date': history.date,
                'result': history.result,
            }
            return JsonResponse(data)
        except Player.DoesNotExist:
            return JsonResponse({'error': 'Player not found'}, status=404)

@csrf_exempt
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
            print("User", user)
            print("id", id)
            print("User_id", user.id)
            if user:
                return JsonResponse({'username': user.username})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def change_settings(request, id):
    if request.method == 'PUT':
            # Get the email from the JSON data
            data = json.loads(request.body)
            user = User.objects.get(id = id)
            player = Player.objects.get(id = id)
            # get data and send to User model
            name = data.get('name')
            if name == '' or name is None:
                name = user.first_name
            username = data.get('username')
            if username == '' or username is None:
                username = user.username
            email = data.get('email')
            if email == '' or email is None:
                email = user.email
            pass1 = data.get('password')
            if pass1 == '' or pass1 is None:
                pass1 = user.password
            image = data.get('image')
            if image == '' or image is None:
                image = player.image
            fa = data.get('fa')
            if fa == '' or fa is None:
                fa = player.fa
            try:
                if user is not None:
                    user.first_name = name
                    user.username = username
                    user.email = email
                    user.password = pass1
                    player.image = image
                    player.fa = fa
                    user.save()
                    player.save()
                    return JsonResponse({'message': 'Change successful'}, status=200)
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=400)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return render(request, 'main/settings.html')

@csrf_exempt
def delete_account(request, id):
    if request.method == 'DELETE':
            try:
                user = User.objects.get(id = id)
                if user is not None:
                    data = json.loads(request.body)
                    refresh = data.get('refresh')
                    token = RefreshToken(refresh)
                    token.blacklist()
                    user.delete()
                    return JsonResponse({'message': 'Delete successful'}, status=200)
                else:
                    return JsonResponse({'error': 'Invalid credentials'}, status=400)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return render(request, 'main/settings.html')
