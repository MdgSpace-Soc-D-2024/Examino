const addClasses = document.getElementById("addClasses")
const gotoadmininfo = document.getElementById("Dashboard")
const addCourses = document.getElementById("addCourses")
const usernameElement = document.getElementById('username')
const getusernamelink =  "http://localhost:8000/api/admin-info/get/"
const getdatalink = "http://localhost:8000/api/admin-info/get/data/"
function setJSON(key, value){
    window.localStorage.setItem(key, value)
}
function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', async(event) => {
    event.preventDefault();
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    const IS_ADMIN = getJSON('is_admin')
    
    if (!AUTHKEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        console.log('hello')
        try {
            console.log('abc')
            const response = await fetch(getusernamelink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',   
                },
                body: JSON.stringify({AUTHKEY}),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.institute)
                usernameElement.textContent = 'Welcome, ' + data.username;
                setJSON('institute', data.institute)
            } else {
                console.error('Failed to fetch username');
            }
        } catch (error) {
            console.error('Error fetching username:', error);
        }

        try{
            console.log('abc')
            const response = await fetch(getdatalink, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    'username': `Bearer ${AUTHKEY}`  
                }  
            });
            if (response.ok) {
                result = await response.json();
                const students = result.students
                const teachers = result.teachers
                const exams = result.exams
                document.getElementById('students').textContent = students;
                document.getElementById('teachers').textContent = teachers;
                document.getElementById('exams').textContent = exams;
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});

if (gotoadmininfo) {
    gotoadmininfo.addEventListener("click", () => {
        window.location.href = 'admin-info.html';
    })
    
}
if (addClasses) {
    addClasses.addEventListener("click", () => {
        window.location.href = 'add-classes.html';
    })
    
}
if (addCourses) {
    addCourses.addEventListener("click", () => {
        window.location.href = 'add-courses.html';
    })
    
}

function logout() {
    clearJSON(); 
    alert('Logged out successfully');
    window.location.href = '../home.html'; 
}


const logoutLink = document.getElementById('adminLogout');
if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
}






