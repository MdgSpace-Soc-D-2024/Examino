from django.db import models
from home.models import *
from django.contrib.auth.models import User
from admin_app.models import *
#from teacher.models import TeacherCred
#from project.settings import *
#from project import settings

class StudentCred(models.Model):
    username = models.CharField(max_length=100)
    #name = models.CharField(max_length=100)
    #roll_number = models.PositiveIntegerField(unique=True, blank=True, null=True)
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    #courses = models.ManyToManyField(In, related_name='students')
    classes = models.CharField(max_length=50)

    def __str__(self):
        return self.username
    
class StudentAnswers(models.Model):
    answers = models.TextField()


    
#class Solutions(models.Model):
#    student = models.ForeignKey(StudentCred, on_delete=models.CASCADE)
#    answers = models.TextField
#    classes = StudentCred.objects.filter(username = student).classes
    
