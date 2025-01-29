from django.shortcuts import render
from rest_framework.views import APIView
from teacher.models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail

import logging
logger = logging.getLogger(__name__)

class LoginTeacherAPIView(APIView):
    def post(self, request):
        try:
            serializer = LoginTeacherSerializer(data=request.data)
            if serializer.is_valid():
                username = serializer.data["username"]
                password = serializer.data["password"]
                teachers = TeacherCred.objects.all()
                for teacher in teachers:
                    if username == teacher.username:
                        teacher_req = TeacherCred.objects.filter(username = username).first()
                        if teacher_req.password == password:
                            return Response({'message': 'Login successful', 'username': username}, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
                    else:
                        return Response({"error": "Username doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       
        except:
            pass
            
class TeacherCredAPIView(APIView):
    def post(self, request):
        serializer = TeacherCredSerializer(data = request.data)
        if serializer.is_valid():
            teacher = serializer.save()
            send_mail(
            subject="Your Login Credentials",
            message=f"Hello {teacher.username},\n\nYour login credentials are:\n Teachern Username: {teacher.username}\nPassword: {teacher.password}.",
            from_email="dhruvi.purohit06@gmail.com",
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
    
teachers = TeacherCred.objects.all()
logger.info(teachers)