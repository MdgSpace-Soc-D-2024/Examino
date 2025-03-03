const loginApiUrl = "http://localhost:8000/api/login-teacher/"

const AUTH_KEY = 'AUTH_KEY';
const is_teacher = 'is_teacher';

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
       // console.log("hello login")
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

            setJSON('AUTH_KEY', result.username);
            setJSON('is_teacher', true);
            //window.localStorage.setItem(AUTH_KEY, result.access);
            //window.localStorage.setItem(is_admin, true)
            //
            window.location.href = 'teacher.html'
        } else {
            const errorData = await response.json();
            console.error("Login error:", errorData);
            alert("Error during login. Check console for details.");
        }
    } catch (error) {
        console.error("Error", error);
    }
});


