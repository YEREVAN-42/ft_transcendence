from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

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
        print("❌", username, pass1)
        user = authenticate(username=username, password=pass1)
		
        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "index.html", {'fname': fname})

        else:
            messages.error(request, "Bad credentials")
            return redirect('home')

    return render(request, "./auth/login.html")

def confirm(request):
    return render(request, "./auth/confirm.html")