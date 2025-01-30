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
from admin_app.serializers import get_user_simplejwt

class LoginStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCred
        fields = ['username', 'password']


class StudentCredSerializer(serializers.ModelSerializer):
    AUTHKEY = serializers.CharField()
    class Meta:
        model = StudentCred
        fields = ['username', 'email', 'AUTHKEY', 'classes']

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
        student = StudentCred.objects.create(institute=institute, **validated_data)
        student.password = password
        student.save()

        return student
        
class StudentAnswersSerializer(serializers.ModelSerializer):

    AUTHKEY = serializers.CharField()
    class Meta:
        model = StudentAnswers
        fields = ['AUTHKEY', 'courses', 'answers']

    def create(self, validated_data):   
        username = get_user_simplejwt(validated_data['AUTHKEY']).get('user')
        student = StudentAnswers.objects.create(**validated_data)
        student.username = username
        student.save()

        return student
    

class StudentMarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentMarks
        fields = ['marks', 'courses']



