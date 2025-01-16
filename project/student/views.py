from django.shortcuts import render
from .models import *
from api.serializers import ExamsGetSerializer
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from teacher.models import Exams
from teacher import views as teacher_views
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated


#class GiveExams(APIView):
#    def customurl(self, request, urlreq):
#        exams = Exams.objects.all()
#        urlreq = exams.courses
#        teacher_views.getExamAPIView.get(request, urlreq)
#
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
