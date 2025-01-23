const admininfoApiUrl = "http://localhost:8000/api/admin-info/"

//document.getElementById("form-admin-info").addEventListener("submit", async (event) => {event.preventDefault();
//    const institute = document.getElementById("institute").value
//    const address = document.getElementById("address").value
//    const phone = document.getElementById("phone").value
//    const email = document.getElementById("email").value
//    
//    const headers = {'Content-Type':'application/json',
//        'Access-Control-Allow-Origin':'*',
//        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
//
//    const response = await fetch(admininfoApiUrl, {
//        statusCode: 200, 
//        method: "POST",
//        headers: headers,
//        body: JSON.stringify({institute, address, phone, email}),
//    });
//});

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

document.getElementById('form-admin-info').addEventListener('submit', async function (event) {
    event.preventDefault();

    const institute = document.getElementById("institute").value
    const address = document.getElementById("address").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value

    try {
        const response = await fetch(admininfoApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ institute, address, email, phone })
        });

        if (response.ok) {
            const data = await response.json();
            alert('successful');
        } else {
            alert('Error submitting institute name.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});