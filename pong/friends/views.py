from django.shortcuts import render

from django.http import JsonResponse

# from core.serializers import FriendListSerializer
from django.contrib.auth.models import User
from friendship.models import Friend, FriendshipRequest

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
		# friends = Friend.objects.friends(user)
		# serializer = FriendListSerializer(friends, many=True)
		# return JsonResponse(serializer.data, safe=False)
		return render(request, 'main/profile.html')

def requests(request, pk):
	print("requests")
	if request.method == 'GET':
		# users = User.objects.all()
		# serializer = FriendListSerializer(users, many=True)
		# return JsonResponse(serializer.data, safe=False)
		return render(request, 'main/profile.html')

# def users(request):
# 	print("users")
# 	if request.method == 'GET':
# 		return render(request, 'main/profile.html')

def users_list(request, pk):
	if request.method == 'GET':
		users = User.objects.all()
		users = [{'id': user.pk, 'username': user.username} for user in users if user.pk != pk]
		print("✅", users)
		return JsonResponse(users, safe=False)

@csrf_exempt
def add_friend(request, pk):
	if request.method == 'POST':
		sender = User.objects.get(pk=pk)
		data = json.loads(request.body)
		receiver = User.objects.get(pk=data.get('receiver_id'))
		if FriendshipRequest.objects.filter(from_user=sender, to_user=receiver).exists():
			raise Exception('Friend request already sent')
		friend_request = FriendshipRequest.objects.create(from_user=sender, to_user=receiver)
		friend_request.save()
		return JsonResponse({'message': 'Friend request sent'})

@csrf_exempt
def accept(request, pk):
	if request.method == 'POST':
		receiver = User.objects.get(pk=pk)
		data = json.loads(request.body)
		sender = User.objects.get(pk=data.get('sender_id'))
		friend_request = FriendshipRequest.objects.get(from_user=sender, to_user=receiver)
		friend_request.accept()
		return JsonResponse({'message': 'Friend request accepted'})

@csrf_exempt
def decline(request, pk):
	if request.method == 'POST':
		receiver = User.objects.get(pk=pk)
		data = json.loads(request.body)
		sender = User.objects.get(pk=data.get('sender_id'))
		friend_request = FriendshipRequest.objects.get(from_user=sender, to_user=receiver)
		friend_request.reject()
		FriendshipRequest.objects.filter(from_user=sender, to_user=receiver).delete()
		return JsonResponse({'message': 'Friend request declined'})

@csrf_exempt
def remove(request, pk):
	if request.method == 'POST':
		sender = User.objects.get(pk=pk)
		data = json.loads(request.body)
		receiver = User.objects.get(pk=data.get('receiver_id'))
		Friend.objects.remove_friend(sender, receiver)
		return JsonResponse({'message': 'Friend removed'})
