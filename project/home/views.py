from django.shortcuts import render
from api.serializers import LoginSerializer, RegisterSerializer, AuthCodeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
import logging
from home.models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
#from .middlewares import auth, guest
#logger = logging.getLogger(__name__)

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 
            refresh = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh),'access': str(refresh.access_token),}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginAPIView(APIView):
    
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            #logger.info("api-request-reached")
            if serializer.is_valid():
                username = serializer.data["username"]
                password = serializer.data["password"]
                #type_of_input = serializer.validated_data.get("type_of")
                user = authenticate(username=username, password=password)
                if user is not None:
                    #logger.info(user)
                    refresh = RefreshToken.for_user(user)

                    return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_200_OK)
                        
                    #return Response({"message": "Login successful", "username": user}, status=status.HTTP_200_OK)
                    
                else:
                    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       
        except:
            pass
            
             

#from django.contrib.auth.models import User

#Example data.
#access_token_str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNDU2LCJqdGkiOiJmZDJmOWQ1ZTFhN2M0MmU4OTQ5MzVlMzYyYmNhOGJjYSJ9.NHlztMGER7UADHZJlxNG0WSi22a2KaYSfd1S-AuT7lU'

def get_user_simplejwt(access_token_str):
    access_token_obj = AccessToken(access_token_str)
    username=access_token_obj['username']
    user=UserNew.objects.get(username=username)
    content =  {'user':username}
    return Response(content)

class AuthCodeAPIView(APIView):
    def post(self, request):
        serializer = AuthCodeSerializer(data=request.data)
        if serializer.is_valid():
            content = get_user_simplejwt(serializer.data['AUTHKEY'])
            
            return Response(content)
        

