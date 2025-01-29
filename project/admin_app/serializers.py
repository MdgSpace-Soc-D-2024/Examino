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

def get_user_simplejwt(token):
    try:
        validated_token = AccessToken(token)
        user = JWTAuthentication().get_user(validated_token)
        logger.info(user)
        return user
    except:
        raise "Authentication failed"
            
class AdminSerializer(serializers.ModelSerializer):
    AUTHKEY = serializers.CharField()
    class Meta:
        model = Admin
        fields = ['AUTHKEY', 'institute', 'address', 'email', 'phone']

    def create(self, validated_data):   
        username = get_user_simplejwt(validated_data['AUTHKEY'])
        validated_data.pop('AUTHKEY')
        user = UserNew.objects.get(username = username)
        admin = Admin.objects.create(username=user, **validated_data)
        admin.save()

        return admin
    
class InstituteClassesSerializer(serializers.ModelSerializer):
    AUTHKEY = serializers.CharField()
    class Meta:
        model = InstituteClass
        fields = ['AUTHKEY', 'classes']
    def create(self, validated_data):   
        username = get_user_simplejwt(validated_data['AUTHKEY'])
        validated_data.pop('AUTHKEY')
        
        user = UserNew.objects.get(username = username)
        institute = Admin.objects.get(username = user)
        classes = InstituteClass.objects.create(institute=institute, classes=validated_data['classes'])
        classes.save()
        return classes

        
class InstituteCoursesSerializer(serializers.ModelSerializer):
    AUTHKEY = serializers.CharField()
    class Meta:
        model = InstituteCourses
        fields = ['AUTHKEY', 'courses']
    def create(self, validated_data):   
        username = get_user_simplejwt(validated_data['AUTHKEY'])
        validated_data.pop('AUTHKEY')
        
        user = UserNew.objects.get(username = username)
        institute = Admin.objects.get(username = user)
        courses = InstituteCourses.objects.create(institute=institute, courses=validated_data['courses'])
        courses.save()

        return courses
    
class InstituteGETCoursesSerializer(serializers.Serializer):
     institute = serializers.CharField()
     courses = serializers.CharField()
    
class InstituteGETClassesSerializer(serializers.Serializer):
     institute = serializers.CharField()
     classes = serializers.CharField()
class AUTHKEYSerializer(serializers.Serializer):
    AUTHKEY = serializers.CharField()
    
class AdminDataUsernameSerializer(serializers.Serializer):
    username = serializers.CharField()
    institute = serializers.CharField()

