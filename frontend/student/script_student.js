const linktostudenthome = document.getElementById('studentHome')
const linktogiveexams = document.getElementById('exams')
const linktoseeresults = document.getElementById('results')
const btnresults = document.getElementById('resultsbtn')
const btnexam = document.getElementById('examsbtn')


function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    const IS_STUDENT = getJSON('is_student');
    
    if (!AUTH_KEY || IS_STUDENT !== true) {
        alert('Access denied. Please log in as a student.');
        window.location.href = 'login.html'; // Redirect to login page
    }
});

function logout() {
    clearJSON(); 
    alert('Logged out successfully');
    window.location.href = '../home.html'; 
}

const logoutLink = document.getElementById('Logout');
if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
}

linktostudenthome.addEventListener('click', function () {
      window.location.href = 'student.html';
});
if (linktogiveexams!=null) {
    linktogiveexams.addEventListener('click', function () {
        window.location.href = 'exam-home.html';
    });
}
if (btnexam!=null) {
    btnexam.addEventListener('click', function () {
        window.location.href = 'exam-home.html';
    });
}
if (linktoseeresults!=null) {
linktoseeresults.addEventListener('click', function () {
    window.location.href = 'result-home.html';
});
}
if (btnresults!=null) {
    btnresults.addEventListener('click', function () {
        window.location.href = 'result-home.html';
    });
}