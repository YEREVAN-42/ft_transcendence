from django.shortcuts import render

from django.http import JsonResponse

# from core.serializers import FriendListSerializer
from django.contrib.auth.models import User
from friendship.models import Friend, FriendshipRequest
from game.models import Player	

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.views.decorators.csrf import csrf_exempt

import json

# Create your views here.

# def friends(request, id):
	# if request.method == 'GET':

def friends(request, pk):
	print("friends")
	if request.method == 'GET':
		user = User.objects.get(pk=pk)
		friends = Friend.objects.friends(user)
		if not friends:
			return JsonResponse({'message': 'No friends'}, status=200)
		friends = [{'id': friend.pk, 'username': friend.username,} for friend in friends]
		return JsonResponse(friends, safe=False)
		# serializer = FriendListSerializer(friends, many=True)
		# return JsonResponse(serializer.data, safe=False)
		return render(request, 'main/profile.html')

def requests(request, pk):
	print("requests")
	if request.method == 'GET':
		requests = FriendshipRequest.objects.filter(to_user=pk)
		if not requests:
			return JsonResponse({'message': 'No requests'}, status=200)
		requests = [{'id': request.pk, 'from_user': request.from_user.username} for request in requests]
	
		return JsonResponse(requests, safe=False)
		# users = User.objects.all()
		# serializer = FriendListSerializer(users, many=True)
		# return JsonResponse(serializer.data, safe=False)
		return render(request, 'main/profile.html')

def users_list(request, pk):
	if request.method == 'GET':
		users = User.objects.all()
		player = Player.objects.get(user=pk)
		users = [{'id': user.pk, 'username': user.username, 'image': player.image} for user in users if user.pk != pk]
		print("✅", users)
		return JsonResponse(users, safe=False)

@csrf_exempt
def add_friend(request, pk):
	if request.method == 'POST':
		sender = User.objects.get(pk=pk)
		if not sender:
			raise Exception('User not found')
		data = json.loads(request.body)
		if not data.get('receiver_id'):
			raise Exception('Receiver not found')
		receiver = User.objects.get(pk=data.get('receiver_id'))
		if not receiver:
			raise Exception('Receiver not found')
		if FriendshipRequest.objects.filter(from_user=sender, to_user=receiver).exists():
			raise Exception('Friend request already sent')
		friend_request = FriendshipRequest.objects.create(from_user=sender, to_user=receiver)
		friend_request.save()
		return JsonResponse({'message': 'Friend request sent'})

@csrf_exempt
def accept(request, pk):
	if request.method == 'POST':
		receiver = User.objects.get(pk=pk)
		if not receiver:
			raise Exception('User not found')
		data = json.loads(request.body)
		if not data.get('sender_id'):
			raise Exception('Sender not found')
		sender = User.objects.get(pk=data.get('sender_id'))
		if not sender:
			raise Exception('Sender not found')
		friend_request = FriendshipRequest.objects.get(from_user=sender, to_user=receiver)
		friend_request.accept()
		return JsonResponse({'message': 'Friend request accepted'})

@csrf_exempt
def decline(request, pk):
	if request.method == 'POST':
		receiver = User.objects.get(pk=pk)
		if not receiver:
			raise Exception('User not found')
		data = json.loads(request.body)
		if not data.get('sender_id'):
			raise Exception('Sender not found')
		sender = User.objects.get(pk=data.get('sender_id'))
		if not sender:
			raise Exception('Sender not found')
		friend_request = FriendshipRequest.objects.get(from_user=sender, to_user=receiver)
		friend_request.reject()
		FriendshipRequest.objects.filter(from_user=sender, to_user=receiver).delete()
		return JsonResponse({'message': 'Friend request declined'})

@csrf_exempt
def remove(request, pk):
	if request.method == 'POST':
		sender = User.objects.get(pk=pk)
		if not sender:
			raise Exception('User not found')
		data = json.loads(request.body)
		if not data.get('receiver_id'):
			raise Exception('Receiver not found')
		receiver = User.objects.get(pk=data.get('receiver_id'))
		if not receiver:
			raise Exception('Receiver not found')
		Friend.objects.remove_friend(sender, receiver)
		return JsonResponse({'message': 'Friend removed'})
