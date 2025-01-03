from django.db import models
from django.contrib.auth.models import User
from home.models import *

class Admin(models.Model):
    username = models.ForeignKey(UserNew, on_delete = models.CASCADE, default=0)
    institute = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.institute
    
class Courses(models.Model):
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    coursename = models.CharField(max_length = 100, default='tobenamed')
    coursecode = models.IntegerField(unique=True, default = 0)
