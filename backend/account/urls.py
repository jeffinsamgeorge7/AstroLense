from django.urls import path,include
from .views import RegisterAPI,LoginAPI,ExoplanetListCreate,exoplanet_list,predict_exoplanet,apod
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path('login/', LoginAPI.as_view() ,name='login'),
    path('reg/',RegisterAPI.as_view(),name='register') ,
    path('exoplanets/', ExoplanetListCreate.as_view(), name='exoplanet-list-create'),
    path('exoplanets/', exoplanet_list, name='exoplanet-list'),
    path('predict_exoplanet/',predict_exoplanet,name="dg"),
    path('apod/', apod, name='apod'),
    
]