from rest_framework  import serializers
from django.contrib.auth.models import User

class LoginSerializer(serializers.Serializer):
    username=serializers.CharField(max_length=255)
    password=serializers.CharField(max_length=255)

class RegisterSerializer(serializers.Serializer):
    username=serializers.CharField(max_length=255)
    email=serializers.EmailField()
    password=serializers.CharField(max_length=255)

    def validate(self, data):
        if 'email' in data:
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError({'email': 'This email is already registered'})
                
        if 'username' in data:
            if User.objects.filter(username=data['username']).exists():
                raise serializers.ValidationError({'username': 'This username is already registered'})
        
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return validated_data
        
        print(validated_data)

from rest_framework import serializers
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# serializers.py
from .models import Exoplanet

class ExoplanetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exoplanet
        fields = '__all__'
