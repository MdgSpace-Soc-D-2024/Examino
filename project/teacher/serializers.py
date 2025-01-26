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


class LoginTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherCred
        fields = ['username', 'password']
    

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

class TeacherCredSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherCred
        fields = ['username', 'email', 'institute', 'courses']
   
    def create(self, validated_data):
        def generate_password(length=12):
            alphabet = string.ascii_letters + string.digits + string.punctuation
            password = ''.join(secrets.choice(alphabet) for _ in range(length))
            return password

        password = generate_password()
        
        institute = validated_data.pop('institute')
        institute = Admin.objects.get(institute=institute)
        teacher = TeacherCred.objects.create(institute=institute, **validated_data)

        teacher.password = password
        teacher.save()

        return teacher