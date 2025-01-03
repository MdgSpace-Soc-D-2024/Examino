const gotologinlink = document.getElementById('goToLogin')
const registerApiUrl = "http://localhost:8000/api/register/"


gotologinlink.addEventListener('click', function () {
  // Navigate to the login page
    window.location.href = 'login.html';
});

document.getElementById("registerModal").addEventListener("submit", async (event) => {event.preventDefault();
    const username = document.getElementById("registerUsername").value
    const password = document.getElementById("registerPassword").value
    const type_of = document.getElementById("registerRole").value
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}

    try {
        console.log("hello")
        const response = await fetch(registerApiUrl, {
            statusCode: 200,
            method: "POST",
            headers: headers,
            body: JSON.stringify({ username, password, type_of}),
        });
        if (response.ok) {
            const result = await response.json();
            alert('Regsitration successful:' + result.username);
            if (type_of == 'admin') {
                window.location.replace("http://localhost:5500/frontend/admin.html");
            } else if (type_of == 'teacher') {
                pass;
            } else if (type_of == 'student') {
                pass;
            }
        } else {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            alert("Error during registration. Check console for details.")
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

