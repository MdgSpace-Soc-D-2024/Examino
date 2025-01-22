const linktoseeresults = "http://localhost:8000/api/results/"

document.addEventListener('DOMContentLoaded', async(event) => { //event.preventDefault();
    console.log('1')
    try{
        console.log('2')

        const response =  await fetch(linktoseeresults)
        console.log('3')
        const data = await response.json();
        console.log('4')
        const resultsContainer = document.getElementById('result-declared');
        data.forEach(result => {

            const resultCard = `
                <div class="col-md-4">
                    <div class="card result-card p-3">
                        <div class="card-body">
                            <h5 class="card-title">${result.courses}</h5>
                            <a href="student-see-results.html?course=${result.courses}"> SEE RESULTS </a>
                        </div>
                    </div>
                </div>
            `;

            resultsContainer.innerHTML += resultCard;
        });
    }
    catch (error) {
        console.error('Error fetching result data:', error)
    }
});
