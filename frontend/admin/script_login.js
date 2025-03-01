const loginApiUrl = "http://localhost:8000/api/login/"
const gotoregisterlink = document.getElementById('goToRegister')
const AUTH_KEY = 'AUTH_KEY';
const is_admin = 'is_admin';
gotoregisterlink.addEventListener('click', function () {
    // Navigate to the register page
    window.location.href = 'register.html';
});
function setJSON(key, value) {
    window.localStorage.setItem(key, value);
}

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
            console.log(response)
            const result = await response.json();
            alert('Login successful');

            setJSON('AUTH_KEY', result.access);
            setJSON('is_admin', true);
            //window.localStorage.setItem(AUTH_KEY, result.access);
            //window.localStorage.setItem(is_admin, true)
            //
            window.location.href = 'admin.html'
        } else {
            const errorData = await response.json();
            console.error("Login error:", errorData);
            alert("Error during login. Check console for details.");
        }
    } catch (error) {
        console.error("Error", error);
    }
});


