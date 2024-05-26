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

import json
from django.utils import timezone

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

def signup(request):
    # if request.method == "POST":
    #     # username = request.POST.get('username') OR
    #     username = request.POST['username']
    #     fname = request.POST['fname']
    #     lname = request.POST['lname']
    #     email = request.POST['email']
    #     pass1 = request.POST['pass1']
    #     pass2 = request.POST['pass2']
        
    #     # print("sdfgh", username)
    #     #if pass1 != pass2:
    #     #    messages.error(request, "Passwords do not match.")
    #     #    return redirect('signup')

    #     messages.success(request, "Your account has been successfully created. ")

    #     return redirect('signin')
    return render(request, "auth/registration.html")

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        pass1 = data.get('password')
        try:
            user = User.objects.get(email=email, password=pass1)
            access = AccessToken.for_user(user)
            refresh = RefreshToken.for_user(user)
            if user is not None:
                if user.is_active:
                    return JsonResponse({'error': 'User already logged in'}, status=400)
                user.last_login = None
                user.is_active = True
                user.save()
                return JsonResponse({'message': 'Login successful',  'access': str(access), 'refresh': str(refresh)}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return render(request, "./auth/login.html")

@csrf_exempt
def confirm(request):
    if request.method == 'POST':
        try:
            # Get the email from the JSON data
            data = json.loads(request.body)

            # get data and send to User model
            name = data.get('name')
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            user = get_user_model().objects.create(
                first_name=name,
                username=username,
                email=email,
                password=password,
                is_active = False
            )
            return JsonResponse({'message': 'Data saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return render(request, "./auth/confirm.html")

@csrf_exempt
def logout(request, pk):
    print("❌")
    if request.method == 'POST':
        print("✅")
        try:
            data = json.loads(request.body)
            refresh = data.get('refresh')
            token = RefreshToken(refresh)
            token.blacklist()
            print("Token", token)
            user = User.objects.get(pk=pk)
            print("Token", user)
            user.last_login = timezone.now()
            user.is_active = False
            user.save()
            return JsonResponse({'message': 'Logout successful'}, status=200)
        except TokenError:
            return JsonResponse({'error': 'Invalid token'}, status=400)
    return render(request, "../main/templates/index.html")
