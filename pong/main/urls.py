from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('home/', views.home, name="home"),
    # path('profile/', views.profile, name="profile"),
    path('settings/', views.settings, name="settings"),
]