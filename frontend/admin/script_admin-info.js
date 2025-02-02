const admininfoApiUrl = "http://localhost:8000/api/admin-info/"


function setJSON(key, value) {
    window.localStorage.setItem(key, value);
}

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = getJSON('AUTH_KEY');
    const IS_ADMIN = getJSON('is_admin');
    
    if (!AUTH_KEY || IS_ADMIN !== true) {
        alert('Access denied. Please log in as an admin.');
        window.location.href = 'login.html'; // Redirect to login page
    }
});

document.getElementById('form-admin-info').addEventListener('submit', async function (event) {
    event.preventDefault();
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY');
    const institute = document.getElementById("institute").value
    const address = document.getElementById("address").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value

    setJSON('institute', institute)

    try {
        console.log('abc')
        const response = await fetch(admininfoApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({AUTHKEY, institute, address, email, phone })
        });

        if (response.ok) {
            const data = await response.json();
            alert('successful');
            window.location.href = 'admin.html'
        } else {
            console.log('not hello')
            alert('Error submitting institute details.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});