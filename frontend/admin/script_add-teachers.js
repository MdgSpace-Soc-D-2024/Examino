const coursegetApiUrl = "http://localhost:8000/api/admin-courses/get/"
const addteacherApiUrl = "http://localhost:8000/api/admin-add-teachers/"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}
const institute = null;
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    const IS_ADMIN = getJSON('is_admin');
    //const institute = window.localStorage.getItem('institute')

    if (!AUTH_KEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html';
    }
});

document.getElementById('addTeacherBtn').addEventListener('click', function() {
    // Show the form when the button is clicked
    document.getElementById('teacherForm').classList.remove('d-none');
});

institutefixed = document.getElementById('institute')
institutefixed.value = window.localStorage.getItem('institute')
async function fetchCourses() {
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    try {
        const response = await fetch(coursegetApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTHKEY}`,
            },
        });

        if (response.ok) {
            const courses_data = await response.json();
            // console.log(courses_data)
            const mycourses = courses_data.courses
            try {
                const courseDropdown = document.getElementById('courseDropdown');
                
                var objs = JSON.parse(mycourses);
                console.log(objs)
                objs.forEach(obj => {
                    const option = document.createElement('option');
                    option.textContent += obj
                    courseDropdown.appendChild(option);
                });
            } catch (ex) {
                console.error(ex);
            }
         } else {
             const errorData = await response.json();
             alert(`Error adding course: ${errorData.detail || 'Unknown error'}`);
         }
    
    } catch (error) {
        console.error('Error adding course:', error);
    }
        
} 

fetchCourses();

document.getElementById('teacherFormFields').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    const courses = document.getElementById('courseDropdown').value;
    console.log(AUTHKEY)
    
    // Example form submission to Django backend
    try{
        const response = await fetch(addteacherApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, AUTHKEY, courses }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Adding error:", errorData);
            alert("Error during adding. Check console for details.")
            
        } else {
            const result = await response.json();
            alert('Teacher added successfully')
            document.getElementById('teacherFormFields').reset();

        }
    } catch(error) {
        console.error('Error adding student:', error);
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
