const classgetApiUrl = "http://localhost:8000/api/admin-class/get/"
const addstudentApiUrl = "http://localhost:8000/api/admin-add-students/"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}
const institute = null;
document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY')
    const IS_ADMIN = getJSON('is_admin');
    //const institute = getJSON('institute')
    if (!AUTH_KEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    }
    //else if (AUTH_KEY && IS_ADMIN === true && !institute){
    //    alert('Add institute data first')
    //    window.location.href = 'admin-info.html'
    //}
});

document.getElementById('addStudentBtn').addEventListener('click', function() {
    // Show the form when the button is clicked
    document.getElementById('studentForm').classList.remove('d-none');
});
institutefixed = document.getElementById('institute')
institutefixed.value = window.localStorage.getItem('institute')

// Function to fetch classes from the Django REST backend
async function fetchClasses() {
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    try {
        const response = await fetch(classgetApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTHKEY}`,
            },
        });

        if (response.ok) {
            const classes_data = await response.json();
            
            const myclasses = classes_data.classes
            try {
                const classDropdown = document.getElementById('classDropdown');
                
                var objs = JSON.parse(myclasses);
                console.log(objs)
                objs.forEach(obj => {
                    const option = document.createElement('option');
                    option.textContent += obj
                    classDropdown.appendChild(option);
                });
            } catch (ex) {
                console.error(ex);
            }
         } else {
             const errorData = await response.json();
             alert(`Error adding class: ${errorData.detail || 'Unknown error'}`);
         }
    
    } catch (error) {
        console.error('Error adding class:', error);
    }
        
} 

fetchClasses();

document.getElementById('studentFormFields').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    const classes = document.getElementById('classDropdown').value;

    // Example form submission to Django backend
    try{
        const response = await fetch(addstudentApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, AUTHKEY, classes }),
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
