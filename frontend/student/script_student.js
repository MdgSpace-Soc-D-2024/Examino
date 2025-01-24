const linktostudenthome = document.getElementById('studentHome')
const linktogiveexams = document.getElementById('exams')
const linktoseeresults = document.getElementById('results')
const btnresults = document.getElementById('resultsbtn')
const btnexam = document.getElementById('examsbtn')


//function getJSON(key) {
//    return JSON.parse(window.localStorage.getItem(key));
//}
//function clearJSON() {
//    window.localStorage.clear();
//}
//
//
//
//document.addEventListener('DOMContentLoaded', () => {
//    const AUTH_KEY = JSON.stringify(getJSON('AUTH_KEY'));
//    const IS_STUDENT = getJSON('is_student');
//    
//    if (!AUTH_KEY || IS_STUDENT !== true) {
//        alert('Access denied. Please log in as a student.');
//        window.location.href = 'login-student.html'; // Redirect to login page
//    }
//});

linktostudenthome.addEventListener('click', function () {
      window.location.href = 'student.html';
});
if (linktogiveexams!=null) {
    linktogiveexams.addEventListener('click', function () {
        window.location.href = 'student-exam.html';
    });
}
if (btnexam!=null) {
    btnexam.addEventListener('click', function () {
        window.location.href = 'student-exam.html';
    });
}
if (linktoseeresults!=null) {
linktoseeresults.addEventListener('click', function () {
    window.location.href = 'student-result.html';
});
}
if (btnresults!=null) {
    btnresults.addEventListener('click', function () {
        window.location.href = 'student-result.html';
    });
}