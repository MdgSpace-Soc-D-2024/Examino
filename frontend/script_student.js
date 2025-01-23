const linktostudenthome = document.getElementById('studentHome')
const linktogiveexams = document.getElementById('exams')
const linktoseeresults = document.getElementById('results')

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


linktoseeresults.addEventListener('click', function () {
    window.location.href = 'student-result.html';
});
