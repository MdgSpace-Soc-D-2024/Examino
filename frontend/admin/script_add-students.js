const classgetApiUrl = "http://localhost:8000/api/admin-class/get/"
const addstudentApiUrl = "http://localhost:8000/api/admin-add-students/"

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
});

document.getElementById('addStudentBtn').addEventListener('click', function() {
    // Show the form when the button is clicked
    document.getElementById('studentForm').classList.remove('d-none');
});

// Function to fetch classes from the Django REST backend
async function fetchClasses() {
    const response_class = await fetch(classgetApiUrl);
    const classes_data = await response_class.json();
    console.log(classes_data)
    const classDropdown = document.getElementById('classDropdown');
    classes_data.forEach(cls => {
        const option = document.createElement('option');
       // option.value = cls.id;
        option.textContent = cls.classes;
        classDropdown.appendChild(option);
    });
};

fetchClasses();

document.getElementById('studentFormFields').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const institute = document.getElementById('institute').value;
    const classes = document.getElementById('classDropdown').value;

    // Example form submission to Django backend
    try{
        const response = await fetch(addstudentApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, email: email, institute: 1, classes: classes }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Adding error:", errorData);
            alert("Error during adding. Check console for details.")
        } else {
            const result = await response.json();
            alert('Student added successfully')
            document.getElementById('studentFormFields').reset();            
        }
    } catch(error) {
        console.error('Error adding student:', error);
    }
});