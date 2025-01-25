from rest_framework import serializers
from home.models import *
from admin_app.models import *
from teacher.models import *
from student.models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
#from rest_framework.response import Response
import string
import secrets
import json
#from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model

#User = get_user_model()
    
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


class LoginTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherCred
        fields = ['username', 'password']
    
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
        fields = ['username', 'email', 'institute', 'classes']

    def create(self, validated_data):
        def generate_password(length=12):
            alphabet = string.ascii_letters + string.digits + string.punctuation
            password = ''.join(secrets.choice(alphabet) for _ in range(length))
            return password

        password = generate_password()

        student = StudentCred.objects.create(**validated_data)
        student.password = password
        student.save()

        return student
        
class StudentAnswersSerializer(serializers.ModelSerializer):

    AUTHKEY = serializers.CharField()
    class Meta:
        model = StudentAnswers
        fields = ['AUTHKEY', 'courses', 'answers']

    def create(self, validated_data):   
        def get_user_simplejwt(access_token_str):
            access_token_obj = AccessToken(access_token_str)
            username=access_token_obj['username']
            #user=StudentCred.objects.get(username=username)
            content =  {'user':username}
            return content
        
        username = get_user_simplejwt(validated_data['AUTHKEY']).get('user')
        student = StudentAnswers.objects.create(**validated_data)
        student.username = username
        student.save()

        return student
    



class StudentMarksSerializer(serializers.ModelSerializer):
    #AUTHKEY = serializers.CharField()
    class Meta:
        model = StudentMarks
        fields = ['marks', 'courses']


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

        teacher = TeacherCred.objects.create(**validated_data)
        teacher.password = password
        teacher.save()

        return teacher
    


#class AuthCodeAPIView(APIView):
#    def post(self, request):
#        serializer = AuthCodeSerializer(data=request.data)
#        if serializer.is_valid():
#            content = get_user_simplejwt(serializer.data['AUTHKEY'])
#            
#            return Response(content)