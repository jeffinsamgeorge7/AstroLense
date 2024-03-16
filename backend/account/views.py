from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import LoginSerializer,RegisterSerializer,ExoplanetSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# from rest_framework import viewsets
# from rest_framework.parsers import MultiPartParser, FormParser
# from .models import FitsFile

# from astropy.io import fits
# import matplotlib.pyplot as plt
# import io


class RegisterAPI(APIView):
    def post(self,request):
        data=request.data
        serializer=RegisterSerializer(data=data)

        if  not serializer.is_valid():
            return Response({
                'status':False,
                'message':serializer.errors}
                ,status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        
        return Response({'status':True,'message':'user created sucessfully'},status.HTTP_200_OK)
        
class LoginAPI(APIView):
    def post(self,request):
        data = request.data
        serializer =LoginSerializer(data=data)

        if  not serializer.is_valid():
            return Response({
                'status':False,
                'message':serializer.errors}
                ,status.HTTP_400_BAD_REQUEST)
        
        user=authenticate(username=serializer.data['username'],password=serializer.data['password'])
        if not user:
            return Response({
                'status':False,
                'message':'invalid credentials'}
                ,status.HTTP_400_BAD_REQUEST)


        token , _ =Token.objects.get_or_create(user=user)
        print(token)

        return Response({'status':True,'message':'login sucessfull','token':str(token)},status.HTTP_200_OK)
        




# views.py
from rest_framework import generics
from .models import Exoplanet

class ExoplanetListCreate(generics.ListCreateAPIView):
    queryset = Exoplanet.objects.all()
    serializer_class = ExoplanetSerializer



from django.http import JsonResponse


def exoplanet_list(request):
    exoplanets = Exoplanet.objects.all().values()  # Get all exoplanet data
    return JsonResponse(list(exoplanets), safe=False)