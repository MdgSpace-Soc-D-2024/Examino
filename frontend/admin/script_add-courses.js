
const addCourseBtn = document.getElementById("addCourseBtn");
const courseInput = document.getElementById("courseInput");
const targetElement = document.getElementById("targetElement");
const showCourses = document.getElementById("showCourses");
const coursegetApiUrl = "http://localhost:8000/api/admin-courses/get/"
const coursepostApiUrl = "http://localhost:8000/api/admin-courses/post/"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}



document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    const IS_ADMIN = getJSON('is_admin')
    if (!AUTH_KEY || IS_ADMIN != true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    }
    //else if (AUTH_KEY && IS_ADMIN === true && !institute){
    //    alert('Add institute data first')
    //    window.location.href = 'admin-info.html'
    //}
});

async function fetchCourses() {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY')
    try {
        const response = await fetch(coursegetApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AUTHKEY: AUTH_KEY}),
        });

        if (response.ok) {
            const courses_data = await response.json();
            console.log(courses_data)
            courseInput.value = '';
            const courseList = document.getElementById('showCourses');
            courseList.innerHTML = ''; 
            if (courses_data != null){
            courses_data.forEach(crs => {
                console.log(crs.institute)
                const courseItem = document.createElement('div');
                courseItem.className = 'mb-2';
                courseItem.textContent = crs.courses;
                courseList.appendChild(courseItem);
        }); 
        } else {
            const errorData = await response.json();
            alert(`Error adding course: ${errorData.detail || 'Unknown error'}`);
        }
    }
    } catch (error) {
        console.error('Error adding course:', error);
    }
        //const response = await fetch(coursegetApiUrl);
}        //const courses_data = await response.json();


document.getElementById("addCourseBtn").addEventListener('click', async (event) => {event.preventDefault();
    const courseInput = document.getElementById('courseInput');
    const courses = courseInput.value.trim();
    const institute = window.localStorage.getItem('institute')
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    if (!courses) {
        alert('Please enter a valid course name.');
        return;
    }

    try {
        const response = await fetch(coursepostApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ AUTHKEY: AUTHKEY, courses: courses }),
        });

        if (response.ok) {
            courseInput.value = ''; // Clear input
            //await fetchClasses(); // Refresh class list
        } else {
            const errorData = await response.json();
            alert(`Error adding course: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error adding course:', error);
    }
});

fetchCourses();