const linktoseeresults = "http://localhost:8000/api/results/view/";

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}


document.addEventListener('DOMContentLoaded', () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY')
    const IS_STUDENT = getJSON('is_student');
    
    if (!AUTH_KEY || IS_STUDENT !== true) {
        alert('Access denied. Please log in as a student.');
        window.location.href = 'student.html'; // Redirect to login page
    }
});

//console.log('abc')

document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    try {
        const response = await fetch(linktoseeresults, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
            },
        });
        console.log('in try')
        if (response.ok){
            const data = await response.json();
            const resultsContainer = document.getElementById('results-declared');
            console.log('data', data)
            //resultsContainer.innerHTML = '';
            const classes = window.localStorage.getItem('classes')
            const objexams = JSON.parse(data.examname)
            const objcourse = JSON.parse(data.courses)
            const data_new = [];
            objexams.forEach((exam, index) => {
                const course = objcourse[index]; // Ensure marks exist
                const data_dict = { examname: exam, courses: course };
                //console.log(data)
                data_new.push(data_dict);
            });

            data_new.forEach(result => {
                const resultCard = `
                    <div class="col-md-4">
                        <div class="card result-card p-3">
                            <div class="card-body">
                                <h5 class="card-title">${result.courses}</h5>
                                <a href="see-results.html?course=${result.courses}&class=${classes}&examname=${result.examname}">SEE RESULTS</a>
                            </div>
                        </div>
                    </div>
                `
                resultsContainer.innerHTML += resultCard;
            });
        } else {
            const errorData = await response.json();
            alert(`Error showing result: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error fetching result data:', error);
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