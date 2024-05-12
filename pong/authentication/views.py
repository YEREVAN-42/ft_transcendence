from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.utils.crypto import get_random_string
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt

import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

def send_confirmation_email(email):
    # Generate confirmation code
    confirmation_code = get_random_string(length=6)
    
    # Send email
    print("Sdfghjk", confirmation_code)
    subject = 'Confirmation Code'
    message = f'Your confirmation code is: {confirmation_code}'
    sender_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    print("maillll", recipient_list[0])
    send_mail(subject, message, sender_email, recipient_list)

    return confirmation_code

def signup(request):
    # return render(request, 'auth/signup.html')
    if request.method == "POST":
        # username = request.POST.get('username') OR
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']
        
        # print("sdfgh", username)
        #if pass1 != pass2:
        #    messages.error(request, "Passwords do not match.")
        #    return redirect('signup')

        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname
        myuser.last_name = lname

        myuser.save()

        messages.success(request, "Your account has been successfully created. ")

        return redirect('signin')
    return render(request, "auth/registration.html")


# def signup(request):
#     if request.method == "POST":
#         username = request.POST['username']
#         fname = request.POST['fname']
#         lname = request.POST['lname']
#         email = request.POST['email']
#         pass1 = request.POST['pass1']
#         pass2 = request.POST['pass2']

#         # Check if passwords match
#         if pass1 != pass2:
#             messages.error(request, "Passwords do not match.")
#             return redirect('signup')  # Redirect back to signup page

#         # Check if username already exists
#         if User.objects.filter(username=username).exists():
#             messages.error(request, "Username already taken.")
#             return redirect('signup')  # Redirect back to signup page

#         # Create user
#         myuser = User.objects.create_user(username, email, pass1)
#         myuser.first_name = fname
#         myuser.last_name = lname
#         myuser.save()

#         messages.success(request, "Your account has been successfully created.")
#         return redirect('signin')  # Redirect to signin page

#     return render(request, "auth/signup.html")


def signin(request):
    # return render(request, 'auth/signin.html')

	

    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']
        user = authenticate(username=username, password=pass1)
		
        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "index.html", {'fname': fname})

        else:
            messages.error(request, "Bad credentials")

            return redirect('home')

    return render(request, "./auth/login.html")

@csrf_exempt
def confirm(request):
    if request.method == 'POST':
        # Get the email from the JSON data
        data = json.loads(request.body)
        email = data.get('email')
        print("email=", email)
        # Send confirmation email
        # confirmation_code = send_confirmation_email(email)
        # return JsonResponse({'confirmation_code': confirmation_code})

    return render(request, "./auth/confirm.html")

# class SigninAPIView(APIView):

#     def post(self, request):
#         username = request.data.get('username')
#         pass1 = request.data.get('pass1')

#         if not username or not pass1:
#             return Response({'error': 'Username and password are required.'}, status=400)

#         user = authenticate(username=username, password=pass1)
        
#         if user is not None:
#             login(request, user)
#             fname = user.first_name
#             return Response({'success': True, 'message': 'Login successful', 'fname': fname})
#         else:
#             messages.error(request, "Bad credentials")
#             return Response({'success': False, 'error': 'Bad credentials'}, status=401)
