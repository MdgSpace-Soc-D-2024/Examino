const gotocreateexam = document.getElementById('createExam')
const gotomanagestudents = document.getElementById('manageStudents')
const gotoviewresults = document.getElementById('viewResults')

gotocreateexam.addEventListener('click', function () {
   
    window.location.href = 'teacher-exam.html';
});
gotomanagestudents.addEventListener('click', function () {
   
    window.location.href = 'teacher-manage-students.html';
});
gotoviewresults.addEventListener('click', function () {
   
    window.location.href = 'teacher-results.html';
});
