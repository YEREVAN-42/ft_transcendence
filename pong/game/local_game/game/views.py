# game/views.py
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'local_game.html')