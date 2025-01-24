const addClasses = document.getElementById("addClasses")
const gotoadmininfo = document.getElementById("Dashboard")
const addCourses = document.getElementById("addCourses")
//const addClasses = document.getElementById("addClasses")
const getusernamelink =  "http://localhost:8000/api/get-username/"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}


document.addEventListener('DOMContentLoaded', async() => {

    const AUTH_KEY = getJSON('AUTH_KEY')
    const IS_ADMIN = getJSON('is_admin')
    
    if (!AUTH_KEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    }
    else {
        const usernameElement = document.getElementById('username');
        const getUsernameURL = 'http://localhost:8000/api/get-username/';
        if (AUTH_KEY && usernameElement) {
            try {
                console.log('abc')
                const response = await fetch(getUsernameURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    body: JSON.stringify({ AUTH_KEY }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    usernameElement.textContent = data.username || 'Admin'; 
                } else {
                    console.error('Failed to fetch username');
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
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
        window.location.href = 'add-class.html';
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
    window.location.href = './home.html'; 
}


const logoutLink = document.getElementById('adminLogout');
if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
}






