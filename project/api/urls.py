from django.urls import path
from . import views
from home import views as home_views
from admin_app import views as admin_views
from teacher import views as teacher_views
from student import views as student_views

urlpatterns = [
    path('register/', home_views.RegisterAPIView.as_view()),
    path('login/', home_views.LoginAPIView.as_view()),
    path('admin-info/', admin_views.AdminInfoView.as_view()),
    path('teacher-exam/', teacher_views.ExamsAPIView.as_view()),
    path('admin-class/post/', admin_views.InstituteClassPOSTAPIView.as_view()),
    path('admin-class/get/', admin_views.InstituteClassGETAPIView.as_view()),
    path('admin-add-students/', admin_views.StudentsCredAPIView.as_view()),
    path('get-username/', home_views.AuthCodeAPIView.as_view()),
    path('admin-courses/post/', admin_views.InstituteCoursesPOSTAPIView.as_view()),
    path('admin-courses/get/', admin_views.InstituteCoursesGETAPIView.as_view()),
    path('exams/get/', teacher_views.getExamAPIView.as_view()),  
    path('answers/', student_views.StudentAnswersAPIView.as_view()),
    path('results/', student_views.MarksGetAPIView.as_view()),
    path('admin-add-teachers/', teacher_views.TeacherCredAPIView.as_view())
]