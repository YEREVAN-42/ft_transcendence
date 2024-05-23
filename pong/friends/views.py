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

# Create your views here.

# def friends(request, id):
	# if request.method == 'GET':

def users(request, id):
	if request.method == 'GET':
		# users = User.objects.all()
		# serializer = FriendListSerializer(users, many=True)
		# return JsonResponse(serializer.data, safe=False)
		return render(request, 'main/profile.html', {'users': users})

def friends(request, id):
	if request.method == 'GET':
		user = User.objects.get(pk=id)
		friends = Friend.objects.friends(user)
		# serializer = FriendListSerializer(friends, many=True)
		# return JsonResponse(serializer.data, safe=False)
		pass

@csrf_exempt
def add_friend(request, pk):
	print("add_friend")
	if request.method == 'POST':
		user = request.user
		friend = User.objects.get(pk=pk)
		# friend_request = FriendshipRequest.objects.create(sender=user, receiver=friend)
		# friend_request.save()
		return JsonResponse({'message': 'Friend request sent'})
		pass

@csrf_exempt
def accept(request, pk):
	print("accept")
	if request.method == 'POST':
		# friend_request = FriendshipRequest.objects.get(pk=pk)
		# friend_request.accept()
		return JsonResponse({'message': 'Friend request accepted'})
		pass

@csrf_exempt
def decline(request, pk):
	if request.method == 'POST':
		# friend_request = FriendshipRequest.objects.get(pk=pk)
		# friend_request.decline()
		return JsonResponse({'message': 'Friend request declined'})
		pass

@csrf_exempt
def remove(request, pk):
	if request.method == 'POST':
		user = request.user
		# friend = User.objects.get(pk=pk)
		# Friend.objects.remove_friend(user, friend)
		return JsonResponse({'message': 'Friend removed'})
		pass
