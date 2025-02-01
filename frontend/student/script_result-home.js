const linktoseeresults = "http://localhost:8000/api/results/";

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
            console.log(data)
            //resultsContainer.innerHTML = '';
            const classes = window.localStorage.getItem('classes')
            data.forEach(result => {
                const resultCard = `
                    <div class="col-md-4">
                        <div class="card result-card p-3">
                            <div class="card-body">
                                <h5 class="card-title">${result.courses}</h5>
                                <a href="see-results.html?course=${result.courses}&class=${classes}">SEE RESULTS</a>
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