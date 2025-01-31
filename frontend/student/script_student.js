const linktostudenthome = document.getElementById('studentHome')
const linktogiveexams = document.getElementById('exams')
const linktoseeresults = document.getElementById('results')
const btnresults = document.getElementById('resultsbtn')
const btnexam = document.getElementById('examsbtn')
const studentcredlink = "http://localhost:8000/api/student-info/get/"

function setJSON(key, value) {
    window.localStorage.setItem(key, value);
}
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

document.addEventListener('DOMContentLoaded', async(event) => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    try {
        const response = await fetch(studentcredlink, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
            },
        });
        
        if (response.ok) {
            const student_data = await response.json();
            const classes = student_data.classes 
            setJSON('classes', classes)
        } else{
            const errorData = await response.json();
             alert(`Error showing course: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error showing course:', error);
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

