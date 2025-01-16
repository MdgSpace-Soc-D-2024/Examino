const linktoseeexams = "http://localhost:8000/api/student-exam"

// Fetch the exams data from the Django REST API
document.addEventListener('DOMContentLoader', async(event) => { event.preventDefault(); 
      // Replace with your actual Django API URL
        const reponse =  await fetch(linktoseeexams)
        const data = reponse.json();
        // Loop through each exam in the data and create the exam cards
        const examsContainer = document.getElementById('exam-scheduled');
        data.forEach(exam => {
            // Create the exam card
            const examCard = `
                <div class="col-md-4">
                    <div class="card exam-card p-3">
                        <div class="card-body">
                            <h5 class="card-title">${exam.courses}</h5>
                            <p class="card-text">Scheduled on: ${exam.date_scheduled}</p>
                            <a href="#" class="btn btn-info">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            // Append the exam card to the container
            examsContainer.innerHTML += examCard;
        });
});
    //.catch(error => {
       // console.error('Error fetching exam data:', error);
