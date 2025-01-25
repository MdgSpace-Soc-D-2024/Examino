const gotologinlink = document.getElementById('goToLogin')
const registerApiUrl = "http://localhost:8000/api/register/"
const AUTH_KEY = 'AUTH_KEY';
const is_admin = 'is_admin';

gotologinlink.addEventListener('click', function () {
    window.location.href = 'login.html';
});
function setJSON(key, value) {
    window.localStorage.setItem(key, value);
};


document.getElementById("registerModal").addEventListener("submit", async (event) => {event.preventDefault();
    const username = document.getElementById("registerUsername").value
    const password = document.getElementById("registerPassword").value
    
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}

    try {
        console.log("hello")
        const response = await fetch(registerApiUrl, {
            statusCode: 200,
            method: "POST",
            headers: headers,
            body: JSON.stringify({ username, password}),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            alert("Error during registration. Check console for details.")
        } else {
            const result = await response.json();
            setJSON('AUTH_KEY', result.access)
            setJSON('is_admin', true)
            //alert('Regsitration successful');
            window.location.href ="admin.html"
           
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

