from django.db import models
from django.contrib.auth.models import User
from home.models import *


class Admin(models.Model):
    username = models.ForeignKey(UserNew, on_delete = models.CASCADE, default=1)
    institute = models.CharField(max_length=200)
    address = models.TextField()
    email = models.EmailField(null=True)
    phone = models.IntegerField(max_length=10, default=9999999999)
    
    def __str__(self):
        return self.institute
 
class InstituteClass(models.Model):
    institute= models.ForeignKey(Admin, on_delete=models.CASCADE)
    classes = models.CharField(max_length=50)

    def __str__(self):
        return self.classes

class InstituteCourses(models.Model):
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    courses = models.CharField(max_length=50)

    def __str__(self):
        return self.courses

