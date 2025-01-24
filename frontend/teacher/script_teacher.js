const gotocreateexam = document.getElementById('createExam')
const gotomanagestudents = document.getElementById('manageStudents')
const gotoviewresults = document.getElementById('viewResults')

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = JSON.stringify(getJSON('AUTH_KEY'));
    const IS_TEACHER = getJSON('is_teacher');
    
    if (!AUTH_KEY || IS_TEACHER !== true) {
        alert('Access denied. Please log in as a teacher.');
        window.location.href = 'login-teacher.html'; // Redirect to login page
    }
});

gotocreateexam.addEventListener('click', function () {
   
    window.location.href = 'exam.html';
});
gotomanagestudents.addEventListener('click', function () {
   
    window.location.href = 'teacher-manage-students.html';
});
gotoviewresults.addEventListener('click', function () {
   
    window.location.href = 'results.html';
});
