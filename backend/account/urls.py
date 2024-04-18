from django.urls import path,include
from .views import RegisterAPI,LoginAPI,ExoplanetListCreate,exoplanet_list,predict_exoplanet,apod,predict_exoplanetsvm,KeplerImageView,ImageUploadView,FitsFileUploadView
from rest_framework.routers import DefaultRouter
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('login/', LoginAPI.as_view() ,name='login'),
    path('reg/',RegisterAPI.as_view(),name='register') ,
    path('exoplanets/', ExoplanetListCreate.as_view(), name='exoplanet-list-create'),
    path('exoplanets/', exoplanet_list, name='exoplanet-list'),
    path('predict_exoplanet/',predict_exoplanet,name="dg"),
    path('predict_exoplanetsvm/',predict_exoplanetsvm,name="svm"),
    path('apod/', apod, name='apod'),
    path('kepler_image_view/',KeplerImageView.as_view(),name='kepler_image_view'),
    path('upload/fits/', ImageUploadView.as_view(), name='image-upload'),
    path('upload/', FitsFileUploadView.as_view(), name='file-upload'),
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
    
    
]