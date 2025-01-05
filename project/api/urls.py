from django.urls import path
from . import views
from home import views as home_views
from admin_app import views as admin_views
urlpatterns = [
    path('admin-site/', views.getAdminCred),
    path('admin-site/add-admin/', views.addAdminCred),
    path('student-site/', views.getStudentCred),
    path('student-site/add-student/', views.addStudentCred),
    path('teacher-site/', views.getTeacherCred),
    path('teacher-site/add-teacher/', views.addTeacherCred),
    path('register/', home_views.RegisterAPIView.as_view()),
    path('login/', home_views.LoginAPIView.as_view()),
    #path('admin/', admin_views.InstituteCodeView.as_view()),
    path('admin-info/', admin_views.AdminInfoView.as_view()),
]