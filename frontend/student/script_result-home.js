const linktoseeresults = "http://localhost:8000/api/results/";

//function getJSON(key) {
//    return JSON.parse(window.localStorage.getItem(key));
//}
//function clearJSON() {
//    window.localStorage.clear();
//}
//
//
//
//document.addEventListener('DOMContentLoaded', () => {
//    const AUTH_KEY = JSON.stringify(getJSON('AUTH_KEY'));
//    const IS_STUDENT = getJSON('is_student');
//    
//    if (!AUTH_KEY || IS_STUDENT !== true) {
//        alert('Access denied. Please log in as a student.');
//        window.location.href = 'login-student.html'; // Redirect to login page
//    }
//});

console.log('abc')

document.addEventListener('DOMContentLoaded', async (event) => {
    console.log('out event')
    event.preventDefault();
    console.log('out try')
    try {
        console.log('in try')
        const response = await fetch(linktoseeresults);
        const data = await response.json();
        const resultsContainer = document.getElementById('result-declared');

        //resultsContainer.innerHTML = '';

        data.forEach(result => {
            const resultCard = `
                <div class="col-md-4">
                    <div class="card result-card p-3">
                        <div class="card-body">
                            <h5 class="card-title">${result.courses}</h5>
                            <a href="student-see-results.html?course=${result.courses}">SEE RESULTS</a>
                        </div>
                    </div>
                </div>
            ;`
            resultsContainer.innerHTML += resultCard;
        });
    } catch (error) {
        console.error('Error fetching result data:', error);
    }
});