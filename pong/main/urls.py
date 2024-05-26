from django.contrib import admin
from django.urls import path, include
# from django.shortcuts import render
# from django.conf.urls import handler404

from . import views
# from django.views.generic import TemplateView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

# def error_404(request, exception):
#     return render(request, 'error.html', status=404)

urlpatterns = [
# 	path('', TemplateView.as_view(template_name='index.html'), name='index'),
#    path('home/', TemplateView.as_view(template_name='home.html'), name='home'),
#    path('profile/', TemplateView.as_view(template_name='profile.html'), name='profile'),
#    path('match_history/', TemplateView.as_view(template_name='match_history.html'), name='match_history'),
#    path('settings/', TemplateView.as_view(template_name='settings.html'), name='settings'),
    
    path('', views.index, name="index"),
    path('home/', views.home, name="home"),
    path('profile/', views.profile, name="profile"),
    path('api/v1/profile/<int:id>/', views.profile_info, name="profile_info"),
    path('api/v1/match_history/<int:id>/', views.match_history, name="match_history"),
    path('api/v1/tournaments/<int:id>/', views.tournaments, name="tournaments"),
    path('api/v1/change_settings/<int:id>/', views.change_settings, name="change_settings"),
    path('api/v1/delete_account/<int:id>/', views.delete_account, name="delete_account"),

	path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/v1/settings/<int:id>/', views.check_settings, name="check_settings"),
    path('settings/', views.settings, name="settings"),

]

# handler404 = error_404