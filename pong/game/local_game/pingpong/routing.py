# pingpong/routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth    import AuthMiddlewareStack

import game.routing

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            local_game.routing.websocket_urlpatterns
        )
    ),
})
