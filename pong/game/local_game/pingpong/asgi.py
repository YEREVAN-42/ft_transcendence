"""
ASGI config for pingpong project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

# pingpong/asgi.py

import os

from local_game.routing import websocket_urlpatterns
from channels.routing   import ProtocolTypeRouter, URLRouter
from django.core.asgi   import get_asgi_application
from channels.auth      import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pingpong.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})

