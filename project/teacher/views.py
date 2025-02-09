from django.shortcuts import render
from rest_framework.views import APIView
from teacher.models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from admin_app.serializers import *
from django.contrib.auth.hashers import check_password
import logging
logger = logging.getLogger(__name__)

class LoginTeacherAPIView(APIView):
    def post(self, request):
        serializer = LoginTeacherSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            
            teacher = TeacherCred.objects.filter(username=username).first()

            if teacher is None:
                return Response({'error': "Username doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)
            if check_password(password, teacher.password):
                return Response({'message': 'Login Successful', 'username': username}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class TeacherCredAPIView(APIView):
    def post(self, request):
        serializer = TeacherCredSerializer(data = request.data)
        if serializer.is_valid():
            teacher, password = serializer.save()
            admin = Admin.objects.get(institute = teacher.institute)
            admin_mail = admin.email
            send_mail(
            subject="Your Login Credentials",
            message=f"Hello {teacher.username},\n\nYour login credentials are:\nTeacher Username: {teacher.username}\nPassword: {password}",
            from_email=admin_mail,
            recipient_list=[teacher.email],
            )
            return Response({"message": "Teacher added successfully"}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamsAPIView(APIView):
    def post(self, request): 
        serializer = ExamsSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            return Response({"message": "Exam created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class getExamAPIView(APIView):
    def get(self, request):
        exams = Exams.objects.all()
        serializer = ExamsGetSerializer(exams, many=True)
        data = serializer.data
        return Response(data)

class InstituteClassesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('username')).split()[1]})
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = TeacherCred.objects.get(username=username)
            institute = user.institute
            logger.info(institute)
            classes = InstituteClass.objects.filter(institute=institute)

            classList = json.dumps([class_data.classes for class_data in classes])
          
            serializer = InstituteClassesGetSerializerTeacher(data = {'classes': classList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class InstituteCoursesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('username')).split()[1]})
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = TeacherCred.objects.get(username=username)
            institute = user.institute
            courses = InstituteCourses.objects.filter(institute=institute)
            courseList = json.dumps([course.courses for course in courses])

            serializer = InstituteCoursesGetSerializerTeacher(data = {'courses': courseList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)