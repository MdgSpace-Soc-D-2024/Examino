from django.db import models
from django.contrib.auth.models import User
from home.models import *
from admin_app.models import *
#from project.settings import AUTH_USER_MODEL

class TeacherCred(models.Model):
    username = models.ForeignKey(UserNew, on_delete=models.CASCADE)
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    


class Exams(models.Model):
    examname = models.CharField(max_length=32)
    #created = models.DateTimeField(auto_now_add=True)
    date_scheduled = models.DateField()
    time_start = models.TimeField()
    time_end = models.TimeField()
