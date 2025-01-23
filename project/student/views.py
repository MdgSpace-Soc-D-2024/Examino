from django.shortcuts import render
from .models import *
from api.serializers import ExamsGetSerializer, StudentAnswersSerializer, StudentMarksSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from teacher.models import Exams
import logging
logger = logging.getLogger(__name__)


class StudentAnswersAPIView(APIView):
    def post(self, request):
        serializer = StudentAnswersSerializer(data = request.data)
        logger.info(serializer)
        if serializer.is_valid():
            logger.info('valid')
            data = serializer.save()
            return Response({"message": "Exam submitted successfully."}, status = status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def checkanswer():
    
    data_answers = StudentAnswers.objects.all()
    data_exam = Exams.objects.all()

    for student_answer in data_answers:
        for exam in data_exam:
            if student_answer.courses == exam.courses:
                courses = exam.courses
                marks = 0
                # Log the exam's questions
                #logger.info(exam.questions)

                # Parse the `questions` field from the exam
                questions = eval(exam.questions.replace("'", '"'))  # Ensure proper JSON format

                # Parse the student's answers
                student_answers = eval(student_answer.answers)

                for i in range(len(questions)):
                    # Get the question and correct answer
                    question_data = questions[i]
                    correct_answer = question_data.get('correctAnswer')  # Assuming "correct_answer" is a key

                    # Get the student's selected answer
                    question_key = f"question{i + 1}"
                    selected_answer = student_answers.get(question_key, 'not-answered')
                    if selected_answer != 'not-answered':
                        selected_answer = 'Option ' + selected_answer[-1]
                    #logger.info(f"Question {i + 1}: {question_data.get('question')}")
                    #logger.info(f"Correct Answer: {correct_answer}")
                    #logger.info(f"Selected Answer: {selected_answer}")

                    # Evaluate the marks
                    if selected_answer == correct_answer:
                        marks += 1  # Add 1 for a correct answer
                        #logger.info(marks)
                    elif selected_answer == 'not-answered':
                        pass  # No marks for unanswered questions
                    else:
                        marks -= 1  # Deduct 1 for an incorrect answer

                #logger.info(f"Total Marks : {marks}")
    return (marks, courses)


checkanswer()

class MarksGetAPIView(APIView):
    marks_list = checkanswer()
    marks_st = marks_list[0]
    courses = marks_list[1]
    def get(self, request):
        student_marks = StudentMarks(
            marks = self.marks_st,
            courses = self.courses
        )
        student_marks.save()
        marks = StudentMarks.objects.all()
        serializer = StudentMarksSerializer(marks, many=True)
        return Response(serializer.data)

                        
            

#class GiveExams(APIView):
#    def customurl(self, request, urlreq):
#        exams = Exams.objects.all()
#        urlreq = exams.courses
        

#class GiveExams(RetrieveAPIView):
#    exams = Exams.objects.all()
#    serializer_class = ExamsGetSerializer
#    lookup_field = 'courses'
#
#
#
#class StudentExamsView(ListAPIView):
#    serializer_class = ExamsGetSerializer
#    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
#
#    def get_queryset(self):
#        # Get the logged-in user
#        user = self.request.user
#
#        # Fetch the student's class from StudentCred
#        try:
#            student_cred = StudentCred.objects.get(username=user.username)
#        except StudentCred.DoesNotExist:
#            return Exams.objects.none()  # Return an empty queryset if no student record is found
#
#        # Filter exams based on the student's class
#        student_class = student_cred.classes
#        return Exams.objects.filter(classes=student_class)
