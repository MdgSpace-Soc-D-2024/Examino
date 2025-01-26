from rest_framework import serializers
from home.models import *
from admin_app.models import *
from teacher.models import *
from student.models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
import string
import secrets
import json
import logging
logger = logging.getLogger(__name__)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNew
        fields = ['username', 'password']

    def create(self, validated_data):
       
        user = UserNew(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user

   
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()