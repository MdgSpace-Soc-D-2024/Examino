from django.db import models
from django.contrib.auth.models import User
from django import forms
choice = [
    ('admin', 'admin'),
    ('teacher', 'teacher'),
    ('student', 'student')
]
class UserNew(User):
    pass
        
#class UserType(models.Model):
#    username = models.ForeignKey(UserNew, on_delete=models.CASCADE)
#    type_of = models.CharField(max_length=7, choices = choice)