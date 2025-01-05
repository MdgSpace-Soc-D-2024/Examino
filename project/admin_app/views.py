from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import InstituteCode
from api.serializers import *

#class InstituteCodeView(APIView):
#    def post(self, request):
#        name = request.data.get('institute')
#        if not name:
#            return Response({"error": "Institute name is required"}, status=status.HTTP_400_BAD_REQUEST)
#
#        # Check if the institute already exists
#        institute, created = InstituteCode.objects.get_or_create(institute=name)
#
#        # Serialize and return the data
#        serializer = InstituteCodeSerializer(institute)
#        return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#class AdminDasboardApiView(APIView):
#    def post(self, request):
#        serializer = AdminSerializer(data=request.data)
#        if serializer.is_valid():
#            adminuser = serializer.save()

class AdminInfoView(APIView):
    def post(self, request):
        # Save Admin data
        admin_serializer = AdminSerializer(data=request.data)
        if admin_serializer.is_valid():
            admin = admin_serializer.save()

            # Generate or fetch Institute Code
            code, created = InstituteCode.objects.get_or_create(admin=admin)

            # Return the code to the frontend
            code_serializer = InstituteCodeSerializer(code)
            return Response(code_serializer.data, status=status.HTTP_201_CREATED)
        return Response(admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)