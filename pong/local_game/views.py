# local_game/views.py
from django.shortcuts import render

# Create your views here.
def local_game(request):
	print("✅ local_game")
	return render(request, 'local_game.html')