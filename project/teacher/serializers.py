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
from django.contrib.auth.hashers import make_password
logger = logging.getLogger(__name__)
from admin_app.serializers import get_user_simplejwt

class TeacherCredSerializer(serializers.ModelSerializer):
    AUTHKEY = serializers.CharField()
    class Meta:
        model = TeacherCred
        fields = ['username', 'email', 'AUTHKEY', 'courses']
   
    def create(self, validated_data):
        def generate_password(length=12):
            alphabet = string.ascii_letters + string.digits + string.punctuation
            password = ''.join(secrets.choice(alphabet) for _ in range(length))
            return password

        password = generate_password()
        username = get_user_simplejwt(validated_data['AUTHKEY'])
        validated_data.pop('AUTHKEY')
        user = UserNew.objects.get(username = username)
        institute = Admin.objects.get(username = user)
        teacher = TeacherCred.objects.create(institute=institute, password = make_password(password), **validated_data)
        #teacher.password = password
        teacher.save()

        return teacher, password

class LoginTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherCred
        fields = ['username', 'password']
    

class ExamsSerializer(serializers.ModelSerializer):

    AUTHKEY = serializers.CharField()

    class Meta:
        model = Exams
        fields = ['AUTHKEY', 'classes', 'courses', 'date_scheduled', 'start_time', 'end_time', 'questions']
    def create(self, validated_data):
        username = validated_data['AUTHKEY']
        user = TeacherCred.objects.get(username = username)
        institute = user.institute
        validated_data.pop('AUTHKEY')
        # Convert JSON string back to Python object
        questions_json = validated_data.pop('questions')
        validated_data['questions'] = json.loads(questions_json)
        exam = Exams.objects.create(institute=institute, **validated_data)
        exam.save()
        return exam
    
    def to_representation(self, instance):
        # Convert questions field back to JSON string for the response
        representation = super().to_representation(instance)
        representation['questions'] = json.loads(instance.questions)  # Convert string to list
        return representation

    

class ExamsGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exams
        fields = '__all__' 

class InstituteCoursesGetSerializerTeacher(serializers.Serializer):
    courses = serializers.CharField()

class InstituteClassesGetSerializerTeacher(serializers.Serializer):
    classes = serializers.CharField()

