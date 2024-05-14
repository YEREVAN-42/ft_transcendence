from django.shortcuts import render, redirect
from django.http import HttpResponse


from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.http import JsonResponse

from django.core.mail import send_mail
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt

import json

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# def send_confirmation_email(email):
#     # Generate confirmation code
#     confirmation_code = get_random_string(length=6)
    
#     # Send email
#     print("Confirmation Code = ", confirmation_code)
#     print("Email = ", email)
#     subject = 'Confirmation Code'
#     message = f'Your confirmation code is: {confirmation_code}'
#     sender_email = settings.EMAIL_HOST_USER
#     print("Sender email = ", sender_email)
#     recipient_list = [email]
#     send_mail(subject, message, sender_email, recipient_list)

#     return confirmation_code

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


@csrf_exempt
def signin(request):
    # return render(request, 'auth/signin.html')

    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        pass1 = data.get('password')
        print("❌ email = ", email)
        print("❌ pass1 = ", pass1)
        user = authenticate(email=email, password=pass1)
		
        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "index.html", {'fname': fname})

        else:
            messages.error(request, "Bad credentials")

            return redirect('home')

    return render(request, "./auth/login.html")

def confirm(request):
    print("confirm")
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
                password=password
            )
            return JsonResponse({'message': 'Data saved successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # Handle GET request or other methods
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
