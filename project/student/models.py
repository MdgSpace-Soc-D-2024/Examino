from django.db import models
from home.models import *
from django.contrib.auth.models import User
from admin_app.models import *
from teacher.models import TeacherCred
#from project.settings import *
from project import settings
#class StudentCred(models.Model):
#    username = models.ForeignKey(UserNew, on_delete=models.CASCADE)
#    name = models.CharField(max_length=100)
#    roll_number = models.PositiveIntegerField(unique=True, blank=True, null=True)
#    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
#    #courses = models.ManyToManyField(In, related_name='students')
#
#    def __str__(self):
#        return f"{self.name} ({self.roll_number})"