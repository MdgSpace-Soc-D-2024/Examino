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
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY')
    const IS_ADMIN = getJSON('is_admin');
    
    if (!AUTH_KEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    }
    //else if (AUTH_KEY && IS_ADMIN === true && !institute){
    //    alert('Add institute data first')
    //    window.location.href = 'admin-info.html'
    //}
});

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
                classInput.value = '';
                const classList = document.getElementById('showClasses');
                classList.innerHTML = ''; 
                var objs = JSON.parse(myclasses);
                console.log(objs)
                objs.forEach(obj => {
                    const classItem = document.createElement('div');
                    classItem.className = 'mb-2';
                    classItem.textContent += obj;
                    classList.appendChild(classItem);
                });
            } catch (ex) {
                console.error(ex);
            }
        } else {
            const errorData = await response.json();
            alert(`Error adding class: ${errorData.detail || 'Unknown error'}`);
        }
    
    } catch (error) {
        console.error('Error adding classes:', error);
    }   
}


document.getElementById('addClassBtn').addEventListener('click', async (event) => {event.preventDefault();
    const classInput = document.getElementById('classInput');
    const className = classInput.value.trim();
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
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
            body: JSON.stringify({ AUTHKEY: AUTHKEY,classes: className }),

        });

        if (response.ok) {
            classInput.value = ''; 
        } else {
            const errorData = await response.json();
            alert(`Error adding class: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error adding class:', error);
    }
});

fetchClasses(); // IIFE

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