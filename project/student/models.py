from django.db import models
from home.models import *
from django.contrib.auth.models import User
from admin_app.models import *
#from teacher.models import TeacherCred
#from project.settings import *
#from project import settings

class StudentCred(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    classes = models.CharField(max_length=50)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
class StudentAnswers(models.Model):
    courses = models.CharField(max_length=50)
    answers = models.TextField()

class StudentMarks(models.Model):
    marks = models.IntegerField()
    courses = models.CharField(max_length=50)

    
#class Solutions(models.Model):
#    student = models.ForeignKey(StudentCred, on_delete=models.CASCADE)
#    answers = models.TextField
#    classes = StudentCred.objects.filter(username = student).classes
    
