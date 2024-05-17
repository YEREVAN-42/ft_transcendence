from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('home/', views.home, name="home"),
    # path('profile/', views.profile, name="profile"),
    path('settings/', views.change_settings, name="settings"),
    path('delete_account/', views.delete_account, name="delete_account"),
]