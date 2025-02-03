from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from teacher.models import Exams
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from django.core.mail import send_mail
from admin_app.serializers import *
from django.contrib.auth.hashers import check_password
import logging
logger = logging.getLogger(__name__)

class StudentCredAPIView(APIView):
    def post(self, request):
        serializer = StudentCredSerializer(data = request.data)

        if serializer.is_valid():
            student, password = serializer.save()
            admin = Admin.objects.get(institute = student.institute)
            admin_mail = admin.email
            send_mail(
            subject="Your Login Credentials",
            message=f"Hello {student.username},\n\nYour login credentials are:\n Student Username: {student.username}\nPassword: {password} \n\n Regards, \n {student.institute}",
            from_email="dhruvi.purohit06@gmail.com",
            recipient_list=[admin_mail],
            )
            return Response({"message": "Student added successfully"}, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StudentCredGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data={'AUTHKEY':(request.headers.get('username')).split()[1]}) 
        if serializer.is_valid():
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.filter(username=username).first()
            getserializer = StudentCredGETSerializer(data={'classes':user.classes})
            if getserializer.is_valid():
                return Response(getserializer.data, status=status.HTTP_200_OK)
            return Response(getserializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginStudentAPIView(APIView):
    def post(self, request):
        serializer = LoginStudentSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            
            student = StudentCred.objects.filter(username=username).first()

            if student is None:
                return Response({'error': "Username doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)

            if check_password(password, student.password):
                return Response({'message': 'Login Successful', 'username': username}, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
def calculatemarks(correct, submitted):
    marks = 0
    for i in range(len(correct)):
        if correct[i] == submitted[i]:
            marks+=1

    return marks
    

class StudentAnswersAPIView(APIView):
    def post(self, request):
        serializer = StudentAnswersSerializer(data = request.data)
        logger.info(serializer)
        if serializer.is_valid():
            logger.info('hello')
            
            submitted_answers_str = serializer.validated_data['answers']
            submitted_answers_str = submitted_answers_str.replace("'", '"') 
            submitted_answers = json.loads(submitted_answers_str)

            #logger.info(submitted_answers)
            studentanswers = list(submitted_answers.values())
            for i in range(len(studentanswers)):
                if studentanswers[i] == "notAttempted":
                    pass
                else:
                    option = studentanswers[i][-1]
                    studentanswers[i] = "Option " + option

            
            student = serializer.validated_data['AUTHKEY']
            logger.info(student)
            student_data = StudentCred.objects.filter(username = student).first()
            classes = student_data.classes
            logger.info(classes)
            admin = Admin.objects.get(institute=student_data.institute)
            logger.info(type(admin))
            courses=serializer.validated_data['courses']
            courses = courses.title() 
            logger.info(courses)
            exams = Exams.objects.get(institute = admin, classes = classes, courses=courses)
            
            logger.info(type(exams))
            data = serializer.save()
            
            questions_answers_str = exams.questions
            logger.info(questions_answers_str)
            questions_answers_str = questions_answers_str.replace("'", '"')
            questions_answers = json.loads(questions_answers_str)
            
            q_and_a = {}
            
            for i in range(len(questions_answers)):
                q_and_a[questions_answers[i].get('question')] = questions_answers[i].get('correctAnswer')

            givenanswers = list(q_and_a.values()) 
            marks = calculatemarks(givenanswers, studentanswers)
            logger.info(marks)
            #marks_serializer = StudentMarksSerializer(data = {'AUTHKEY': str(student_data.username), 'institute': str(admin.institute), 'marks': marks, 'courses': exams.courses})
            student_marks = StudentMarks.objects.create(username = student_data, institute = admin, marks = marks, courses = courses)
            student_marks.save()
            return Response({"message": "Exam submitted"}, status = status.HTTP_202_ACCEPTED)
        return Response(serializer.errors)
    
class AllStudentMarksAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('username')).split()[1]})
        course_serializer = CourseSerializer(data = {'courses': (request.headers.get('courses')).split()[1]})
        if serializer.is_valid() and course_serializer.is_valid(): 

            username = serializer.data['AUTHKEY']
            student = StudentCred.objects.get(username=username)
            institute = Admin.objects.get(institute = student.institute)
            courses=course_serializer.data['courses']
            courses = courses.title() 
            marks = StudentMarks.objects.filter(institute=institute, courses=courses)
            marksList = json.dumps([mark.marks for mark in marks])
            users = []
            for i in marks:
                users.append(str(i.username))
            userList = json.dumps([user for user in users])
            #classList = json.dumps([classes.classes for classes in student])

            student_serializer = AllStudentMarksSerializer(data = {'institute': institute.institute, 'student': userList, 'marks': marksList, 'courses': courses})
            if student_serializer.is_valid():
                return Response(student_serializer.data, status=status.HTTP_200_OK)
            return Response(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class InstituteClassesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('Authorization')).split()[1]})
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.get(username=username)
            institute = user.institute
            classes = InstituteClass.objects.filter(institute=institute)

            classList = json.dumps([class_data.classes for class_data in classes])

            serializer = InstituteGETClassesSerializer(data = {'institute': institute, 'classes': classList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class InstituteCoursesGETAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('Authorization')).split()[1]})
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.get(username=username)
            institute = user.institute
            courses = InstituteCourses.objects.filter(institute=institute)
            courseList = json.dumps([course.courses for course in courses])

            serializer = InstituteGETCoursesSerializer(data = {'institute': institute, 'courses': courseList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        
class ExamsGetAPIView(APIView):
    def get(self, request):
        serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('username')).split()[1]})
        logger.info('abc')
        if serializer.is_valid():  
            username = serializer.data['AUTHKEY']
            user = StudentCred.objects.get(username=username)
            institute = user.institute
            print(user)
            exams = Exams.objects.filter(institute=institute)
            classList = json.dumps([exams_data.classes for exams_data in exams])
            courseList = json.dumps([exams_data.courses for exams_data in exams])
            dateList = json.dumps([exams_data.date_scheduled for exams_data in exams])
            questionsList = json.dumps([exams_data.questions for exams_data in exams])

            serializer = ExamsGetSerializer(data = {'institute':institute, 'classes': classList, 'courses': courseList, 'date_scheduled': dateList, 'questions': questionsList})
            
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            

class StudentResultsAPIView(APIView):
    def get(self, request):
        try:
            serializer = AUTHKEYSerializer(data = {'AUTHKEY': (request.headers.get('username')).split()[1]})
            if serializer.is_valid():
                username = serializer.data['AUTHKEY']
                student = StudentCred.objects.filter(username = username).first()
                institute = Admin.objects.get(institute=student.institute)
                result = StudentMarks.objects.get(username = student, institute=institute)
                logger.info(institute.institute)
                result_serializer = StudentMarksSerializer(data = [{'username': username, 'institute':institute.institute, 'marks': result.marks, 'courses': result.courses}], many = True)
                logger.info(result_serializer)
                if result_serializer.is_valid():
                    logger.info('hello')
                    return Response(result_serializer.data, status=status.HTTP_200_OK)
                return Response(result_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('no results')
