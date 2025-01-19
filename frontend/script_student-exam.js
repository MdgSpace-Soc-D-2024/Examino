const linktoseeexams = "http://localhost:8000/api/exams/get"

document.addEventListener('DOMContentLoaded', async(event) => { event.preventDefault(); 
      
    try{
      const reponse =  await fetch(linktoseeexams)
      const data = await reponse.json();
      
      const examsContainer = document.getElementById('exam-scheduled');
      data.forEach(exam => {
          
          const examCard = `
              <div class="col-md-4">
                  <div class="card exam-card p-3">
                      <div class="card-body">
                          <h5 class="card-title">${exam.courses}</h5>
                          <p class="card-text">Scheduled on: ${exam.date_scheduled}</p>
                          
                      </div>
                  </div>
              </div>
          `;
          
          examsContainer.innerHTML += examCard;
      });
    }
    catch (error) {
        console.error('Error fetching exam data:', error)
    }
});
