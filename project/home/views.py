from django.shortcuts import render
from api.serializers import LoginSerializer, RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import logging
from home.models import *
logger = logging.getLogger(__name__)

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        logger.info("api-request-reached")
        if serializer.is_valid():
            #def create(self, validated_data):
            #    user = UserNew.objects.create_user(
            #    username=validated_data['username'],
            #    password=validated_data['password'],
            #    type_of = validated_data['type_of']
            #)
            #    return user
            user = serializer.save()
            return Response({"message": "User registered successfully", "username": user.username}, status=status.HTTP_201_CREATED)
        return Response("error", status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    
    def post(self, request):
       
        serializer = LoginSerializer(data=request.data)
        logger.info("api-request-reached")
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")
            type_of = serializer.validated_data.get("type_of")
          
            user = authenticate(username=username, password=password)
            
            if user is not None:
                if user.profile.type_of == type_of:
                    return Response({"message": "Login successful", "username": user.username}, status=status.HTTP_200_OK)
                    
                else:
                    return Response({"error": "User type mismatch"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response("error")#, status=status.HTTP_400_BAD_REQUEST)