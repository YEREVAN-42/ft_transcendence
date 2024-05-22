from django.shortcuts import render

from django.http import JsonResponse

# from core.serializers import FriendListSerializer
from django.contrib.auth.models import User
from friendship.models import Friend, FriendshipRequest

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# def friends(request, id):
	# if request.method == 'GET':

def friends(request, id):
	if request.method == 'GET':
		user = User.objects.get(pk=id)
		friends = Friend.objects.friends(user)
		# serializer = FriendListSerializer(friends, many=True)
		# return JsonResponse(serializer.data, safe=False)
		pass

def add_friend(request, pk):
	if request.method == 'POST':
		user = request.user
		friend = User.objects.get(pk=pk)
		friend_request = FriendshipRequest.objects.create(sender=user, receiver=friend)
		friend_request.save()
		return JsonResponse({'message': 'Friend request sent'})
		pass

def accept(request, pk):
	if request.method == 'POST':
		friend_request = FriendshipRequest.objects.get(pk=pk)
		friend_request.accept()
		return JsonResponse({'message': 'Friend request accepted'})
		pass

def decline(request, pk):
	if request.method == 'POST':
		friend_request = FriendshipRequest.objects.get(pk=pk)
		friend_request.decline()
		return JsonResponse({'message': 'Friend request declined'})
		pass

def remove(request, pk):
	if request.method == 'POST':
		user = request.user
		friend = User.objects.get(pk=pk)
		Friend.objects.remove_friend(user, friend)
		return JsonResponse({'message': 'Friend removed'})
		pass
