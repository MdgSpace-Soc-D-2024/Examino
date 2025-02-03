from django.db import models
from home.models import *
from django.contrib.auth.models import User
from admin_app.models import *
from teacher.models import *

class StudentCred(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    classes = models.CharField(max_length=50)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
class StudentAnswers(models.Model):
    username = models.ForeignKey(StudentCred, on_delete=models.CASCADE)
    examname = models.ForeignKey(Exams, on_delete=models.CASCADE)
    courses = models.CharField(max_length=50)
    answers = models.TextField()

class StudentMarks(models.Model):
    username = models.ForeignKey(StudentCred, on_delete=models.CASCADE)
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    examname = models.ForeignKey(Exams, on_delete=models.CASCADE)
    marks = models.IntegerField()
    courses = models.CharField(max_length=50)

class ExamAttempt(models.Model):
    username = models.ForeignKey(StudentCred, on_delete=models.CASCADE)
    examname = models.ForeignKey(Exams, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('username', 'examname')
        

    
