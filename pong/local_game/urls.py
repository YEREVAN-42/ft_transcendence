# local_game/urls.py
from django.urls import path
from .           import views

urlpatterns = [
    path('local_game/', views.local_game, name='local_game'),
]
