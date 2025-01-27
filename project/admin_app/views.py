from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
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
    def post(self, request):
        serializer = AUTHKEYSerializer(data = request.data)
        if serializer.is_valid():  
            AUTHKEY = serializer.data['AUTHKEY']
            logger.info(AUTHKEY)
            username = get_user_simplejwt(AUTHKEY)
            try:
                admin = Admin.objects.get(username=username)
                institute = admin.institute
                logger.info(institute)
                courses = InstituteCourses.objects.get(institute=institute)
                logger.info(courses)
            except:
                institute = None
                courses = None
            serializer = InstituteGETCoursesSerializer({'institute':institute, 'courses': courses}, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
class InstituteCoursesPOSTAPIView(APIView):    
    def post(self, request):
        serializer = InstituteCoursesSerializer(data=request.data)
        if serializer.is_valid():
            cred = serializer.save()
            return Response({"message": "Course added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def get_user_simplejwt(token):
    try:
        validated_token = AccessToken(token)
        user = JWTAuthentication().get_user(validated_token)
        logger.info(user)
        return user
    except:
        raise "Authentication failed"

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

    
 
            