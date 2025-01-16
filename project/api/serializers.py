from rest_framework import serializers
from home.models import *
from admin_app.models import *
from teacher.models import *
from student.models import *

import json
#from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model

#User = get_user_model()
    
class RegisterSerializer(serializers.ModelSerializer):
    #password = serializers.CharField(write_only=True)

    class Meta:
        model = UserNew
        fields = ['username', 'password']

    #def create(self, validated_data):
    #    return UserNew.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['username', 'type_of']

    
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['institute', 'address', 'email', 'phone']

class AuthCodeSerializer(serializers.Serializer):
    authkey = serializers.CharField()



class ExamsSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        # Convert JSON string back to Python object
        questions_json = validated_data.pop('questions')
        validated_data['questions'] = json.loads(questions_json)
        return super().create(validated_data)

    def to_representation(self, instance):
        # Convert questions field back to JSON string for the response
        representation = super().to_representation(instance)
        representation['questions'] = json.loads(instance.questions)  # Convert string to list
        return representation

    class Meta:
        model = Exams
        fields = ['institute', 'classes', 'courses', 'date_scheduled', 'questions']

class ExamsGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exams
        fields = '__all__' 
      
class InstituteClassSerializer(serializers.ModelSerializer):

    class Meta:
        model = InstituteClass
        fields = ['id', 'institute', 'classes']
        
class InstituteCoursesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = InstituteCourses
        fields = ['id', 'institute', 'courses']


class StudentCredSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentCred
        fields = ['username', 'institute', 'classes']
        
