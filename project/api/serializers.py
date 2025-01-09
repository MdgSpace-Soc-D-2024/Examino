from rest_framework import serializers
from home.models import *
from admin_app.models import *
from teacher.models import *
from student.models import *
from student.views import *
#from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model

#User = get_user_model()
#class RegisterSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = UserNew
#        fields = ['username', 'password', 'type_of']
#
#    #def create(self, validated_data):
#    #    user = UserNew.objects.create_user(
#    #        username=validated_data['username'],
#    #        password=validated_data['password'],
#    #        type_of = validated_data['type_of']
#    #    )
#    #    return user
#
#
##class LoginSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = UserNew
##        fields = ['username', 'password', 'type_of']
#
#class LoginSerializer(serializers.Serializer):
#    username = serializers.CharField()
#    password = serializers.CharField(write_only=True)
#    type_of = serializers.CharField()
#    
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


class InstituteCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteCode
        fields = ['institute', 'code']

class ExamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exams
        fields = ['class_exam', 'subject', 'date_scheduled', 'questions']
        
class InstituteClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteClass
        fields = ['classes']
class InstituteSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteCourses
        fields = ['courses']
#class TeacherCredSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = TeacherCred
#        fields = ['username', 'institute', 'course']
#
#class CourseSerializer(serializers.ModelSerializer):
#    institution = serializers.PrimaryKeyRelatedField(queryset=Courses.objects.all())
#    class Meta:
#        model = Courses
#        fields = ['id', 'coursename', 'coursecode']  
#
#
#class StudentCredSerializer(serializers.ModelSerializer):
#    courses = CourseSerializer(many=True, read_only=True) 
#    course_ids = serializers.PrimaryKeyRelatedField(
#        queryset=Courses.objects.all(),
#        many=True,
#        write_only=False,
#        source='courses'
#    ) 
#    
#    class Meta:
#        model = StudentCred
#        fields = ['name', 'roll_number', 'courses']
#        read_only_fields = ['roll_number']
#