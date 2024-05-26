from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import requests

import os
import json
import requests

from urllib.parse import urlencode

# Create your views here.
@csrf_exempt
def get_access_token(code):
    data = {
        'grant_type': 'authorization_code',
        'client_id': os.environ.get('INTRA_API_UID'),
        'client_secret': os.environ.get('INTRA_API_SECRET'),
        'redirect_uri': os.environ.get('INTRA_REDIRECT_URI'),
        'code': code,
    }
    print("🔑 Request data:", data)
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post('https://api.intra.42.fr/oauth/token', data=data, headers=headers)
    print("❌ Response status:", response.status_code)
    print("❌ Response content:", response.text)
    if response.status_code != 200:
        return None
    return response.json()

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        if code is None:
            return JsonResponse({'error': 'No code provided'}, status=400)
        print("🔑 Code received:", code)
        access_token = get_access_token(code)

        if access_token is None:
            return JsonResponse({'error': 'Failed to obtain access token'}, status=400)
        print("✅ Access token received:", access_token)
        # You can now use the access token to authenticate the user or perform further actions
        return JsonResponse({'access_token': access_token})
    return render(request, 'main/home.html')
# def get_access_token(code):
#     data = {
#         'grant_type': 'authorization_code',
#         'client_id': os.environ.get('INTRA_API_UID'),
#         'client_secret': os.environ.get('INTRA_API_SECRET'),
#         'redirect_uri':os.environ.get('INTRA_REDIRECT_URI'),
#         'code': code,
#     }
#     print("🔑", data)
#     headers = {'Content-Type': 'application/x-www-form-urlencoded'}
#     response = requests.post('https://api.intra.42.fr/oauth/token', data=data, headers=headers)
#     print("❌", response)
#     if response.status_code != 200:
#         return None
#     return response.json()

# @csrf_exempt
# def login(request):
# 	if request.method == 'POST':
# 		data = json.loads(request.body)
# 		code = data.get('code')
# 		if code is None:
# 			return JsonResponse({'error': 'No code provided'}, status=400)
# 		print("🔑", code)
# 		# data = {
#         #     'grant_type': 'authorization_code',
#         #     'client_id': os.environ.get('INTRA_API_UID'),
#         #     'client_secret': os.environ.get('INTRA_API_SECRET'),
#         #     'redirect_uri':os.environ.get('INTRA_REDIRECT_URI'),
#         #     'code': code,
#         # }
# 		access_token = get_access_token(code)
# 		# headers = {'Content-Type': 'application/x-www-form-urlencoded'}
# 		# response = requests.post('https://api.intra.42.fr/oauth/token', data=data, headers=headers)
# 		print("❌ token=", access_token)
# 	return render(request, 'main/home.html')
