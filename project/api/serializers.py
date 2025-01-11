from rest_framework import serializers
from home.models import *
from admin_app.models import *
from teacher.models import *
from student.models import *
from student.views import *
#from django.contrib.auth.models import User
#from django.contrib.auth import get_user_model

#User = get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNew
        fields = ['username', 'password', 'type_of']

    #def create(self, validated_data):
    #    user = UserNew.objects.create_user(
    #        username=validated_data['username'],
    #        password=validated_data['password'],
    #        type_of = validated_data['type_of']
    #    )
    #    return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNew
        fields = ['username', 'password', 'type_of']

        
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['institute', 'address', 'email', 'phone']




class ExamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exams
        fields = ['class_exam', 'subject', 'date_scheduled', 'questions']
        
class InstituteClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteClass
        fields = ['institute', 'classes']
        
class InstituteCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteCourses
        fields = ['institute', 'courses']
#class TeacherCredSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = TeacherCred
#        fields = ['username', 'institute', 'course']
#
#class CourseSerializer(serializers.ModelSerializer):
#    institution = serializers.PrimaryKeyRelatedField(queryset=InstituteCourses.objects.all())
#    class Meta:
#        model = InstituteCourses
#        fields = ['id', 'courses']  


class StudentCredSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCred
        fields = ['username', 'institute', 'courses']
        #read_only_fields = ['roll_number']
