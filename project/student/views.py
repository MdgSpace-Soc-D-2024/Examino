from django.shortcuts import render
from .models import *
from api.serializers import ExamsGetSerializer, StudentAnswersSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from teacher.models import Exams
import logging
logger = logging.getLogger(__name__)


class StudentAnswersAPIView(APIView):
    def post(self, request):
        serializer = StudentAnswersSerializer(data = request.data)
        if serializer.is_valid():
            logger.info('valid')
            data = serializer.save()
            return Response({"message": "Exam submitted successfully."}, status = status.HTTP_201_CREATED)
        logger.info(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#class GiveExams(APIView):
#    def customurl(self, request, urlreq):
#        exams = Exams.objects.all()
#        urlreq = exams.courses
        

#class GiveExams(RetrieveAPIView):
#    exams = Exams.objects.all()
#    serializer_class = ExamsGetSerializer
#    lookup_field = 'courses'
#
#
#
#class StudentExamsView(ListAPIView):
#    serializer_class = ExamsGetSerializer
#    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
#
#    def get_queryset(self):
#        # Get the logged-in user
#        user = self.request.user
#
#        # Fetch the student's class from StudentCred
#        try:
#            student_cred = StudentCred.objects.get(username=user.username)
#        except StudentCred.DoesNotExist:
#            return Exams.objects.none()  # Return an empty queryset if no student record is found
#
#        # Filter exams based on the student's class
#        student_class = student_cred.classes
#        return Exams.objects.filter(classes=student_class)
