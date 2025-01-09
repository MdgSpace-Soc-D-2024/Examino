from django.shortcuts import render
from rest_framework.views import APIView
from teacher.models import *
from api.serializers import ExamsSerializer
from rest_framework.response import Response
from rest_framework import status

class ExamsAPIView(APIView):
    def post(self, request):
        serializer = ExamsSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Exam created successfully"}, status=status.HTTP_201_CREATED)
        return Response("error", status=status.HTTP_400_BAD_REQUEST)


