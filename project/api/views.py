from rest_framework.response import Response
from rest_framework.decorators import api_view
from admin_app.models import *

from student.models import *
from .serializers import *
from teacher.models import *
from home.views import *

#ADMIN
@api_view(['GET'])
def getAdminCred(request):
    items = Admin.objects.all()
    serializer = AdminSerializer(items, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
def addAdminCred(request):
    serializer = AdminSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#TEACHER
#@api_view(['GET'])
#def getTeacherCred(request):
#    items = TeacherCred.objects.all()
#    serializer = TeacherCredSerializer(data=request.data)
#    serializer.is_valid(raise_exception=True)
#    return Response(serializer.data)
#
#@api_view(['POST'])
#def addTeacherCred(request):
#    serializer = TeacherCredSerializer(data=request.initial_data)
#    if serializer.is_valid():
#        serializer.save()
#    return Response(serializer.data)
#
#
##STUDENT
#
## Serializer for the StudentCred model
#class StudentCredSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = StudentCred
#        fields = '__all__'
#
#class StudentCreateAPIView(generics.CreateAPIView):
#    queryset = StudentCred.objects.all()
#    serializer_class = StudentCredSerializer
#
#    def perform_create(self, serializer):
#        # Save the student without a roll number first
#        student = serializer.save()
#
#        # Re-fetch all students and assign roll numbers
#        students = StudentCred.objects.order_by('name')
#        for index, student in enumerate(students, start=1):
#            student.roll_number = index
#            student.save(update_fields=['roll_number'])
#
#        return student
#
#
#@api_view(['GET'])
#def getStudentCred(request):
#    # Get all student records and serialize them
#    students = StudentCred.objects.all()
#    serializer = StudentCredSerializer(students, many=True)
#    return Response(serializer.data)
#
#
#@api_view(['POST'])
#def addStudentCred(request):
#    # Handle POST request to add a new student
#    serializer = StudentCredSerializer(data=request.data)
#    if serializer.is_valid():
#        serializer.save()
#        return Response(serializer.data, status=201)  # Return 201 Created
#    return Response(serializer.errors, status=400)  # Return 400 Bad Request on error
#
#


