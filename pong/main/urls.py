from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path('', views.index, name="index"),
    path('home/', views.home, name="home"),
    # path('profile/', views.profile, name="profile"),
    path('settings/', views.change_settings, name="settings"),
    path('delete_account/', views.delete_account, name="delete_account"),

	path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]