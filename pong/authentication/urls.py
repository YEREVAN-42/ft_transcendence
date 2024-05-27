#stexi commentnern a karoxa petq lini bacel

from django.contrib import admin
from django.urls import path, include
from authentication import views
# from django.views.generic import TemplateView


urlpatterns = [
	# path('signin/', TemplateView.as_view(template_name='signin.html'), name='signin'),
    # path('signup/', TemplateView.as_view(template_name='signup.html'), name='signup'),
    # path('confirm/', TemplateView.as_view(template_name='confirm.html'), name='confirm'),


    path('signup/', views.signup, name="signup"),
    path('signin/', views.signin, name="signin"),
    path('confirm/', views.confirm, name="confirm"),
    path('intra/', views.intra, name="intra"),
    path('api/v1/logout/<int:pk>/', views.logout, name="logout")
]