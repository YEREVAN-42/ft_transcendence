from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request, 'main/home.html')

def settings(request):
    return render(request, 'main/settings.html')
