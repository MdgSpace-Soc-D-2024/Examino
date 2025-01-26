// Get elements
const addClassBtn = document.getElementById("addClassBtn");
const classInput = document.getElementById("classInput");
const targetElement = document.getElementById("targetElement");
const showClasses = document.getElementById("showClasses");
const classgetApiUrl = "http://localhost:8000/api/admin-class/get/"
const classpostApiUrl = "http://localhost:8000/api/admin-class/post/"

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
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    }
    else if (AUTH_KEY && IS_ADMIN === true && !institute){
        alert('Add institute data first')
        window.location.href = 'admin-info.html'
    }
});

async function fetchClasses() {
    try {
        const response = await fetch(classgetApiUrl);
        const classes_data = await response.json();

        const classList = document.getElementById('showClasses');
        classList.innerHTML = ''; // Clear any existing content
        if (classes_data != null){
        classes_data.forEach(cls => {
            const classItem = document.createElement('div');
            classItem.className = 'mb-2';
            classItem.textContent = cls.classes;
            classList.appendChild(classItem);
        });
        }
    } catch (error) {
        console.error('Error fetching classes:', error);
    }
};

document.getElementById('addClassBtn').addEventListener('click', async (event) => {event.preventDefault();
    const classInput = document.getElementById('classInput');
    const className = classInput.value.trim();

    if (!className) {
        alert('Please enter a valid class name.');
        return;
    }

    try {
        const response = await fetch(classpostApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ institute: 1,classes: className }),
        });

        if (response.ok) {
            classInput.value = ''; // Clear input
            //await fetchClasses(); // Refresh class list
        } else {
            const errorData = await response.json();
            alert(`Error adding class: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error adding class:', error);
    }
});

fetchClasses();