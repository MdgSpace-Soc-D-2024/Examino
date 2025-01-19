const getexamlink = "http://localhost:8000/api/exams/get/";
const postanswerslink = "http://localhost:8000/api/answers/";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        //const pathSegments = window.location.pathname.split('/').filter(segment => segment);
       // const courses = pathSegments[pathSegments.indexOf('student-exam-portal.html') + 1] || '';
        const response = await fetch(getexamlink);
        
        const exams_data = await response.json();
        
        for (let i = 0; i < exams_data.length; i++) {
            const exam = exams_data[i];
            courses = exam.courses
            institute = exam.institute
            
            const Questions = JSON.parse(exam.questions.replace(/'/g, '"'));
            document.getElementById('course-name').textContent = courses;
            document.getElementById('institute-name').textContent = institute;
            const questionContainer = document.getElementById('question-container');
            const questionPalette = document.getElementById('question-palette');
            const totalQuestions = Questions.length;

            let attemptedCount = 0;
            let notAttemptedCount = totalQuestions;

            Questions.forEach((question, index) => {
                const questionHtml = `
                    <div class="mb-4">
                        <h5>${index + 1}. ${question.question}</h5>
                        ${question.options.map((option, o) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="question${index + 1}" id="q${index + 1}a${o + 1}" data-question-index="${index}">
                                <label class="form-check-label" for="q${index + 1}a${o + 1}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                `;

                questionContainer.innerHTML += questionHtml;
                const circle = document.createElement('div');
                circle.classList.add('question-circle', 'not-seen');
                circle.textContent = index + 1;
                circle.setAttribute('data-question-index', index);
                questionPalette.appendChild(circle);
            });

            const allRadios = document.querySelectorAll('input[type="radio"]');
            allRadios.forEach(radio => {
                radio.addEventListener('change', function () {
                    const questionIndex = this.getAttribute('data-question-index');
                    const circle = document.querySelector(`.question-circle[data-question-index="${questionIndex}"]`);
                    if (!circle.classList.contains('attempted')) {
                        circle.classList.remove('not-seen', 'seen');
                        circle.classList.add('attempted');
                        attemptedCount++;
                        notAttemptedCount--;
                        document.getElementById('attempted-count').textContent = attemptedCount;
                        document.getElementById('not-attempted-count').textContent = notAttemptedCount;
                    }
                });
            });

            const allCircles = document.querySelectorAll('.question-circle');
            allCircles.forEach(circle => {
                circle.addEventListener('click', function () {
                    this.classList.remove('not-seen');
                    this.classList.add('seen');
                });
            });

            document.getElementById('attempted-count').textContent = attemptedCount;
            document.getElementById('not-attempted-count').textContent = notAttemptedCount;
        
            document.getElementById('submitBtn').addEventListener('click', async () => {
                const answers = {};
                allRadios.forEach(radio => {
                    const questionIndex = radio.getAttribute('data-question-index');
                    const questionKey = `question${parseInt(questionIndex) + 1}`;
                    
                    if (!answers[questionKey]){
                        answers[questionKey] = 'not-answered';
                    }
                    if (radio.checked){
                        answers[questionKey] = radio.id;
                    }

                });
                const payload = {
                    answers: JSON.stringify(answers),
                };
                console.log('Answers:', payload);
                console.log('outside')
                const headers = {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
       
                
                try{   
                    console.log('inside') 
                    response_answers = fetch(postanswerslink, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(payload),
                    });
                    console.log('inside') 
                    if (response_answers.ok){
                        //const responseData = await submitResponse.json();
                        alert('Submission Successful!');
                        //console.log(responseData);
                    } else {
                        console.log('error')
                    }
                } catch (err) {
                    console.error("Error:", err)
                }
            });
        }
    
    } catch (error) {
        console.error('Error adding exam paper:', error);
    }
});
        
        

