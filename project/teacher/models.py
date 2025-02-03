from django.db import models
from django.contrib.auth.models import User
from home.models import *
from admin_app.models import *
from django.utils import timezone
class TeacherCred(models.Model):
    username = models.CharField(max_length = 100)
    email = models.EmailField()
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    courses = models.CharField(max_length=32)
    password = models.CharField(max_length = 100)

    def __str__(self):
        return self.username

class Exams(models.Model):
    examname = models.CharField(max_length=50)
    institute = models.ForeignKey(Admin, on_delete=models.CASCADE)
    classes = models.CharField(max_length=50)
    courses = models.CharField(max_length=32)
    #created = models.DateTimeField(auto_now_add=True)
    date_scheduled = models.DateField()
    start_time = models.TimeField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)
    questions = models.TextField()
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['institute', 'examname'], name='unique_field1_field2')
        ]
