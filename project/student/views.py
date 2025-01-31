from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from teacher.models import Exams
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from django.core.mail import send_mail
from admin_app.serializers import *
import logging
logger = logging.getLogger(__name__)

class StudentCredAPIView(APIView):
    def post(self, request):
        serializer = StudentCredSerializer(data = request.data)

        if serializer.is_valid():
            student = serializer.save()
            refresh = RefreshToken.for_user(student)

            send_mail(
            subject="Your Login Credentials",
            message=f"Hello {student.username},\n\nYour login credentials are:\n Student Username: {student.username}\nPassword: {student.password}. \n\n Regards, \n {student.institute}",
            from_email="dhruvi.purohit06@gmail.com",
            recipient_list=[student.email],
            )
            return Response({"message": "Student added successfully"}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StudentCredGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data={'AUTHKEY':(request.headers.get('username')).split()[1]}) 
        if serializer.is_valid():
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.filter(username=username).first()
            getserializer = StudentCredGETSerializer(data={'classes':user.classes})
            if getserializer.is_valid():
                return Response(getserializer.data, status=status.HTTP_200_OK)
            return Response(getserializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginStudentAPIView(APIView):
    def post(self, request):
        try:
            serializer = LoginStudentSerializer(data=request.data)
            
            if serializer.is_valid():
                username = serializer.data["username"]
                password = serializer.data["password"]
                students = StudentCred.objects.all()

                for student in students:
                    if username == student.username:
                        student_req = StudentCred.objects.filter(username = username).first()
                        if password == student_req.password:
                            return Response({'message': 'Login Successful', 'username': username}, status = status.HTTP_200_OK)
                        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
                    return Response({'message': "Username doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       
        except:
            pass
   
class StudentAnswersAPIView(APIView):
    def post(self, request):
        serializer = StudentAnswersSerializer(data = request.data)
        logger.info(serializer)
        if serializer.is_valid():
            logger.info('hello')
            data = serializer.save()
            return Response({"message": "Exam submitted successfully."}, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class InstituteClassesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('Authorization')).split()[1]})
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.get(username=username)
            institute = user.institute
            classes = InstituteClass.objects.filter(institute=institute)

            classList = json.dumps([class_data.classes for class_data in classes])

            serializer = InstituteGETClassesSerializer(data = {'institute': institute, 'classes': classList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class InstituteCoursesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('Authorization')).split()[1]})
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.get(username=username)
            institute = user.institute
            courses = InstituteCourses.objects.filter(institute=institute)
            courseList = json.dumps([course.courses for course in courses])

            serializer = InstituteGETCoursesSerializer(data = {'institute': institute, 'courses': courseList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        
class ExamsGetAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('username')).split()[1]})
        logger.info('abc')
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.get(username=username)
            institute = user.institute
            print(user)
            exams = Exams.objects.filter(institute=institute)
            classList = json.dumps([exams_data.classes for exams_data in exams])
            courseList = json.dumps([exams_data.courses for exams_data in exams])
            dateList = json.dumps([exams_data.date_scheduled for exams_data in exams])
            questionsList = json.dumps([exams_data.questions for exams_data in exams])

            serializer = ExamsGetSerializer(data = {'institute':institute, 'classes': classList, 'courses': courseList, 'date_scheduled': dateList, 'questions': questionsList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            

