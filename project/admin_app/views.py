from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from api.serializers import *
import logging
logger = logging.getLogger(__name__)

class AdminInfoView(APIView):
    def post(self, request):
        admin_serializer = AdminSerializer(data=request.data)
        if admin_serializer.is_valid():
            admin = admin_serializer.save()
            return Response({"message": "Details added successfully"}, status=status.HTTP_201_CREATED)
        return Response(admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InstituteClassPOSTAPIView(APIView):    
    def post(self, request):
        serializer = InstituteClassSerializer(data=request.data)
        if serializer.is_valid():
            cred = serializer.save()
            return Response({"message": "Class added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class InstituteClassGETAPIView(APIView):
    def get(self, request):
        cred = InstituteClass.objects.all()
        serializer = InstituteClassSerializer(cred, many=True)
        data = serializer.data
        return Response(data)
    

class InstituteCoursesGETAPIView(APIView):
    def get(self, request):
        cred = InstituteCourses.objects.all()
        serializer = InstituteCoursesSerializer(cred, many=True)
        data = serializer.data
        return Response(data)
class InstituteCoursesPOSTAPIView(APIView):    
    def post(self, request):
        serializer = InstituteCoursesSerializer(data=request.data)
        if serializer.is_valid():
            cred = serializer.save()
            return Response({"message": "Course added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentsCredAPIView(APIView):
    def post(self, request):
        serializer = StudentCredSerializer(data=request.data)
        
        if serializer.is_valid():
            data = serializer.save()
            return Response({'message': 'Student added successfully'}, status=status.HTTP_201_CREATED)
        return Response('error', status=status.HTTP_400_BAD_REQUEST)
    
      

        
            