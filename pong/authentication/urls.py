from django.contrib import admin
from django.urls import path, include
from authentication import views

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('signin/', views.signin, name="signin"),
    path('confirm/', views.confirm, name="confirm"),
]