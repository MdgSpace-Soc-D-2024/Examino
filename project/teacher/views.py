from django.shortcuts import render
from rest_framework.views import APIView
from teacher.models import *
from api.serializers import *
from rest_framework.response import Response
from rest_framework import status
import logging
logger = logging.getLogger(__name__)

class ExamsAPIView(APIView):
    def post(self, request): 
        serializer = ExamsSerializer(data=request.data)
        if serializer.is_valid():
            #logger.info('valid')
            data = serializer.save()
            return Response({"message": "Exam created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class getExamAPIView(APIView):
    def get(self, request):
        exams = Exams.objects.all()
        serializer = ExamsGetSerializer(exams, many=True)
        data = serializer.data
        #logger.info(data)
        return Response(data)

