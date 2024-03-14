from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import LoginSerializer,RegisterSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


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
        




@api_view(['POST'])
def login(request):
    data=request.data
    serializer=LoginSerializer(data=data)

    if serializer.is_valid():
        data=serializer.validated_data
        return Response({'message':'sucess'})
    
    return Response(serializer.errors)