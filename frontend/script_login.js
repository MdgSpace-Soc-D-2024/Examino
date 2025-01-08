const loginApiUrl = "http://localhost:8000/api/login/"
const gotoregisterlink = document.getElementById('goToRegister')

gotoregisterlink.addEventListener('click', function () {
    // Navigate to the register page
    window.location.href = 'register.html';
});

document.getElementById("loginModal").addEventListener("submit", async (event) => {event.preventDefault();
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
    try {
        console.log("hello login")
        const response = await fetch(loginApiUrl, {
            statusCode: 200, 
            method: "POST",
            headers: headers,
            body: JSON.stringify({ username, password}),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Login successful:' + result.username);

        } else {
            const errorData = await response.json();
            console.error("Login error:", errorData);
            alert("Error during login. Check console for details.");
        }
    } catch (error) {
        console.error("Error", error);
    }
});


