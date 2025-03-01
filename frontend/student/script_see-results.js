const linktoseeresults = "http://localhost:8000/api/results/view/";
const linktoseeall = "http://localhost:8000/api/results/all/"
const linktoseecourse = "http://localhost:8000/api/results/coursewise/"
const params = new URLSearchParams(window.location.search);
const courses = params.get('course'); 
const classes = params.get('class');
const examname = params.get('examname');
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
        
        response = await fetch(linktoseeresults, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
                'examname': `Bearer ${examname}`
            },
        });
        if (response.ok) {
            const results = await response.json();
            //console.log('results', results)
                
            const subjects = JSON.parse(results.courses)
            const scores = JSON.parse(results.marks)
            //console.log(subjects)
            subjects.forEach((subject, index) => {
            if (subject == courses){
                document.getElementById("course").textContent = courses;
                document.getElementById("totalmarks").textContent = scores[index];
            }
        });
        
            const ctx = document.getElementById("resultChart").getContext("2d");
            //const subjects = JSON.parse(results.courses)
            //const marks = JSON.parse(results.marks)
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: subjects,
                    datasets: [{
                        label: "Student Scores",
                        data: scores,
                        backgroundColor: "rgb(245, 248, 250)",
                        borderColor: "rgb(253, 254, 254)",
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
                    },
                    plugins: {
                        legend: { labels: { color: 'white' } }
                    },
                    scales: {
                        x: { ticks: { color: 'white' } },
                        y: { ticks: { color: 'white' } }
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
                    plugins: {
                        legend: { labels: { color: 'white' } }
                    }
                }
            });
            
        }
            
         else {
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
        const examname = params.get('examname')
        response = await fetch(linktoseeall, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
                'courses': `Bearer ${courses}`,
                'examname': `Bearer ${examname}`
            },
        });
        if (response.ok) {
            const results = await response.json();
            console.log('hello', results)
            const leaderboardData = [];
            
            
            //// Convert JSON string to array
            const objstudent = JSON.parse(results.student);
            const objmarks = JSON.parse(results.marks);
           // console.log(objstudent)
            objstudent.forEach((user, index) => {
                const studentMarks = objmarks[index]; // Ensure marks exist
                const data = { name: user, score: studentMarks };
                //console.log(data)
                leaderboardData.push(data);
            });

           // console.log(results)
            
            leaderboardData.sort((a, b) => b.score - a.score);
            //console.log(leaderboardData)
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

document.addEventListener('DOMContentLoaded', async (event) => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    response = await fetch(linktoseecourse, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'username': `Bearer ${AUTH_KEY}`,
            'courses': `Bearer ${courses}`
        },
    });
    if (response.ok){
        const result = await response.json(); 
        //console.log(result)
        const marks = JSON.parse(result.marks);
        const exams = JSON.parse(result.examname);
        const lineCtx = document.getElementById("lineChart").getContext("2d");
        new Chart(lineCtx, {
            type: "line",
            data: {
                labels: exams,
                datasets: [{
                    label: `Progress Over Time of ${courses}`,
                    data: marks,
                    backgroundColor: "rgb(245, 248, 250)",
                    borderColor: "rgb(253, 254, 254)",
                    fill: false
                }]
            },
            options: {
                scales: {  
                    x: { 
                        ticks: { color: 'white' } 
                    },
                    y: { 
                        beginAtZero: true,
                        ticks: { color: 'white' } 
                    }
                },
                plugins: {
                    legend: { labels: { color: 'white' } }
                }
            }
        });
        
    }
})


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