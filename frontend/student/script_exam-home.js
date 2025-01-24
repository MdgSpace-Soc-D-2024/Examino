const linktoseeexams = "http://localhost:8000/api/exams/get"
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
document.addEventListener('DOMContentLoaded', async(event) => { event.preventDefault(); 
      
    try{
      const response =  await fetch(linktoseeexams)
      const data = await response.json();
      
      const examsContainer = document.getElementById('exam-scheduled');
      data.forEach(exam => {
          
          const examCard = `
              <div class="col-md-4">
                  <div class="card exam-card p-3">
                      <div class="card-body">
                          <h5 class="card-title">${exam.courses}</h5>
                          <p class="card-text">Scheduled on: ${exam.date_scheduled}</p>
                          <a href="student-exam-portal.html?course=${exam.courses}"> TAKE EXAM </a>
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
