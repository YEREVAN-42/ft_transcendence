# local_game/routing.py
from django.urls import path
from .consumers  import PongConsumer

websocket_urlpatterns = [
    path('ws/pong/', PongConsumer.as_asgi()),
]
