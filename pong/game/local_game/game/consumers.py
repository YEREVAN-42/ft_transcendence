# local_game/consumers.py
from channels.generic.websocket import WebsocketConsumer

import json

class PongConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        # Handle incoming WebSocket messages
        data = json.loads(text_data)
        # Logic for handling messages
        self.send(text_data=json.dumps({'message': 'pong'}))
