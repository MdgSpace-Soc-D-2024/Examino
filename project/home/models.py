from django.db import models
from django.contrib.auth.models import User
from django import forms
choice = [
    ('admin', 'admin'),
    ('teacher', 'teacher'),
    ('student', 'student')
]
class UserNew(User):
    type_of = models.CharField(max_length=7, choices = choice)
        

