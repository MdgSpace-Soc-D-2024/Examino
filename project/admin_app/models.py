from django.db import models
from django.contrib.auth.models import User
from home.models import *
import string
import random

class Admin(models.Model):
    #username = models.ForeignKey(UserNew, on_delete = models.CASCADE, default=0)
    institute = models.CharField(max_length=200)
    address = models.TextField()
    email = models.EmailField(null=True)
    phone = models.IntegerField(max_length=10, default=9999999999)
    

    def __str__(self):
        return self.institute
    


def generate_unique_code():
    length = 6  
    characters = string.ascii_uppercase + string.digits
    return ''.join(random.choices(characters, k=length))

class InstituteCode(models.Model):
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, blank=True)

    def save(self):
        if not self.code:
            self.code = generate_unique_code()
        super().save()







class Courses(models.Model):
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    coursename = models.CharField(max_length = 100, default='tobenamed')
    coursecode = models.IntegerField(unique=True, default = 0)