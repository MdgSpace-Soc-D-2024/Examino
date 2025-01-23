const coursegetApiUrl = "http://localhost:8000/api/admin-courses/get/"
const addstudentApiUrl = "http://localhost:8000/api/admin-add-teachers/"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = JSON.stringify(getJSON('AUTH_KEY'));
    const IS_ADMIN = getJSON('is_admin');
    
    if (!AUTH_KEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as a teacher.');
        window.location.href = 'login-teacher.html'; // Redirect to login page
    }
});

document.getElementById('addTeacherBtn').addEventListener('click', function() {
    // Show the form when the button is clicked
    document.getElementById('teacherForm').classList.remove('d-none');
});

// Function to fetch classes from the Django REST backend
async function fetchCourses() {
    const response_course = await fetch(coursegetApiUrl);
    const courses_data = await response_course.json();
    console.log(courses_data)
    const courseDropdown = document.getElementById('courseDropdown');
    courses_data.forEach(crs => {
        const option = document.createElement('option');
        option.textContent = crs.courses;
        courseDropdown.appendChild(option);
    });
};

fetchCourses();

document.getElementById('teacherFormFields').addEventListener('submit', async (event) => {event.preventDefault();
    const username = document.getElementById('username').value;
    const institute = document.getElementById('institute').value;
    const courses = document.getElementById('courseDropdown').value;

    // Example form submission to Django backend
    try{
        const response = await fetch(addstudentApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, institute: 1, classes: courses }),
        });
        if (response.ok) {
            const result = await response.json();
            alert('Student added successfully')
            document.getElementById('studentFormFields').reset();
        } else {
            const errorData = await response.json();
            console.error("Adding error:", errorData);
            alert("Error during adding. Check console for details.")

        }
    } catch(error) {
        console.error('Error adding student:', error);
    }
});