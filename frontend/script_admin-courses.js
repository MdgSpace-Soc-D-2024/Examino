
const addCourseBtn = document.getElementById("addCourseBtn");
const courseInput = document.getElementById("courseInput");
const targetElement = document.getElementById("targetElement");
const showCourses = document.getElementById("showCourses");
const coursegetApiUrl = "http://localhost:8000/api/admin-courses/get/"
const coursepostApiUrl = "http://localhost:8000/api/admin-courses/post/"


async function fetchCourses() {
    try {
        const response = await fetch(coursegetApiUrl);
        const courses_data = await response.json();

        const courseList = document.getElementById('showCourses');
        courseList.innerHTML = ''; 
        if (courses_data != null){
        courses_data.forEach(crs => {
            const courseItem = document.createElement('div');
            courseItem.className = 'mb-2';
            courseItem.textContent = crs.courses;
            courseList.appendChild(courseItem);
        });
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
};

document.getElementById("addCourseBtn").addEventListener('click', async (event) => {event.preventDefault();
    
    const coursename = courseInput.value.trim();

    if (!coursename) {
        alert('Please enter a valid course name.');
        return;
    }

    try {
        const response = await fetch(coursepostApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ institute: 1,courses: coursename }),
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