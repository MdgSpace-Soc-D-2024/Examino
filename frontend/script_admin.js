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


//const AUTH_KEY = 'auth_token'
//const IS_ADMIN = false
document.addEventListener('DOMContentLoaded', async() => {
    //const AUTH_KEY = window.localStorage.getItem(AUTH_KEY)
    //const IS_ADMIN = window.localStorage.getItem(is_admin)
    
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
                        //'Authorization': `Bearer ${AUTH_KEY}`, // If API expects a Bearer token
                    },
                    body: JSON.stringify({ AUTH_KEY }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    usernameElement.textContent = data.username || 'Admin'; // Display username or fallback to 'Admin'
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
        window.location.href = 'admin-class.html';
    })
    
}
if (addCourses) {
    addCourses.addEventListener("click", () => {
        window.location.href = 'admin-courses.html';
    })
    
}

function logout() {
    clearJSON(); // Clear all local storage data
    alert('Logged out successfully');
    window.location.href = 'login.html'; // Redirect to login page
}


const logoutLink = document.getElementById('adminLogout');
if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
}


//function isAuthenticated() {
//    return (AUTH_KEY !== null) && (IS_ADMIN === true);
//}





