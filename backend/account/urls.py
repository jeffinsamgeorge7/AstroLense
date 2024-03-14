from django.urls import path
from .views import RegisterAPI,LoginAPI

urlpatterns = [
    path('login/', LoginAPI.as_view() ,name='login'),
    path('reg/',RegisterAPI.as_view(),name='register') 
]