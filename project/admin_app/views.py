from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
import logging
import json
logger = logging.getLogger(__name__)
from admin_app.serializers import get_user_simplejwt

class AdminInfoView(APIView):
    def post(self, request):
        admin_serializer = AdminSerializer(data=request.data)
        if admin_serializer.is_valid():
            admin = admin_serializer.save()
            return Response({"message": "Details added successfully"}, status=status.HTTP_201_CREATED)
        return Response(admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InstituteClassPOSTAPIView(APIView):    
    def post(self, request):
        serializer = InstituteClassesSerializer(data=request.data)
        if serializer.is_valid():
            cred = serializer.save()
            return Response({"message": "Class added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class InstituteClassesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('Authorization')).split()[1]})
        if serializer.is_valid():  
            AUTHKEY = serializer.data['AUTHKEY']
            username = get_user_simplejwt(AUTHKEY)
            institute = Admin.objects.get(username=username)
            classes = InstituteClass.objects.filter(institute=institute)

            classList = json.dumps([class_data.classes for class_data in classes])
            print(type(classList))

            serializer = InstituteGETClassesSerializer(data = {'institute': institute.institute, 'classes': classList})
            print(serializer)
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class InstituteCoursesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('Authorization')).split()[1]})
        if serializer.is_valid():  
            AUTHKEY = serializer.data['AUTHKEY']
            username = get_user_simplejwt(AUTHKEY)
            institute = Admin.objects.get(username=username)
            courses = InstituteCourses.objects.filter(institute=institute)
            courseList = json.dumps([course.courses for course in courses])
            print(type(courseList))

            serializer = InstituteGETCoursesSerializer(data = {'institute': institute.institute, 'courses': courseList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
class InstituteCoursesPOSTAPIView(APIView):    
    def post(self, request):
        serializer = InstituteCoursesSerializer(data=request.data)
        if serializer.is_valid():
            cred = serializer.save()
            return Response({"message": "Course added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class AdminDataToFrontendAPIView(APIView):
    def post(self, request):
        serializer = AUTHKEYSerializer(data = request.data)
        if serializer.is_valid():  
            AUTHKEY = serializer.data['AUTHKEY']
            logger.info(AUTHKEY)

            username = get_user_simplejwt(AUTHKEY)
            try:
                admin = Admin.objects.get(username=username)
                institute = admin.institute
            except:
                institute = None
            serializer = AdminDataUsernameSerializer({'username':username, 'institute':institute})
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
 
            