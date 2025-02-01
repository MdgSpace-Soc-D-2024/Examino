const linktoseeresults = "http://localhost:8000/api/results/";
const linktoseeall = "http://localhost:8000/api/results/all"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    const IS_STUDENT = getJSON('is_student');
    
    if (!AUTH_KEY || IS_STUDENT !== true) {
        alert('Access denied. Please log in as a student.');
        window.location.href = 'login.html'; // Redirect to login page
    }
});

document.addEventListener("DOMContentLoaded", async(event) => {
    event.preventDefault();
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    //const classes = window.localStorage.getItem('classes');

    try{
        const params = new URLSearchParams(window.location.search);
        const courses = params.get('course'); 
        const classes = params.get('class')
        response = await fetch(linktoseeresults, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
            },
        });
        if (response.ok) {
            const results = await response.json();
            const subjects = [];
            const scores = [];
            results.forEach(result => {
                
                subjects.push(result.courses)
                scores.push(result.marks)
                
                if (result.courses == courses){
                    document.getElementById("course").textContent = courses;
                    document.getElementById("totalmarks").textContent = result.marks;
                }
            });
            const ctx = document.getElementById("resultChart").getContext("2d");
            
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: subjects,
                    datasets: [{
                        label: "Student Scores",
                        data: scores,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });
        
            const pieCtx = document.getElementById("pieChart").getContext("2d");
            new Chart(pieCtx, {
                type: "pie",
                data: {
                    labels: subjects,
                    datasets: [{
                        data: scores,
                        backgroundColor: ["red", "blue", "green", "yellow", "purple"]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });
        
            const lineCtx = document.getElementById("lineChart").getContext("2d");
            new Chart(lineCtx, {
                type: "line",
                data: {
                    labels: subjects,
                    datasets: [{
                        label: "Progress Over Time",
                        data: scores,
                        borderColor: "blue",
                        fill: false
                    }]
                }
            });
        } else {
            console.log(response.error)
        }
    
    } catch(error) {
        console.log(error)
    }
});

//leaderboard
document.addEventListener("DOMContentLoaded", async(event) => {
    event.preventDefault();
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    
    const classes = window.localStorage.getItem('classes');

    try{
        const params = new URLSearchParams(window.location.search);
        const courses = params.get('course'); 
        const classes = params.get('class')
        response = await fetch(linktoseeall, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
                'courses': `Bearer ${courses}`,
            },
        });
        if (response.ok) {
            const leaderboardData = [];
            const results = await response.json();
            //console.log(results)
            // Convert JSON string to array
            const objstudent = JSON.parse(results.student);
            const objmarks = JSON.parse(results.marks);
            
            objstudent.forEach((user, index) => {
                const studentMarks = objmarks[index]; // Ensure marks exist
                const data = { name: user, score: studentMarks };
                //console.log(data)
                leaderboardData.push(data);
            });

            leaderboardData.sort((a, b) => b.score - a.score);
            console.log(leaderboardData)
            const leaderboardEl = document.getElementById("leaderboard");
            leaderboardData.forEach((student, index) => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `<span>${index + 1}. ${student.name}</span> <span class="badge bg-primary">${student.score}</span>`;
                leaderboardEl.appendChild(li);
            });
        }

    } catch (error) {
        console.log(error)
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