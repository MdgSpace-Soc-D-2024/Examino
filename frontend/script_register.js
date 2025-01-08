const gotologinlink = document.getElementById('goToLogin')
const registerApiUrl = "http://localhost:8000/api/register/"


gotologinlink.addEventListener('click', function () {
    window.location.href = 'login.html';
});

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
        if (response.ok) {
            const result = await response.json();
            alert('Regsitration successful:' + result.username);
            window.location.href ="http://localhost:8000/api/type/"
        } else {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            alert("Error during registration. Check console for details.")
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

