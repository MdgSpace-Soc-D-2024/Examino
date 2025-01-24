from django.db import models
from django.contrib.auth.models import User
from home.models import *
from admin_app.models import *
#from project.settings import AUTH_USER_MODEL

class TeacherCred(models.Model):
    username = models.CharField(max_length = 100)
    email = models.EmailField()
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    courses = models.CharField(max_length=32)
    password = models.CharField(max_length = 100)

    def __str__(self):
        return self.username

class Exams(models.Model):
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    classes = models.CharField(max_length=50)
    courses = models.CharField(max_length=32)
    #created = models.DateTimeField(auto_now_add=True)
    date_scheduled = models.DateField()
    #time_start = models.TimeField()
    #time_end = models.TimeField()
    questions = models.TextField()
