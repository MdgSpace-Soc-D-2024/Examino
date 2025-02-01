const getexamlink = "http://localhost:8000/api/exams/get/";
const postanswerslink = "http://localhost:8000/api/answers/";
const studentcredlink = "http://localhost:8000/api/student-info/get/"
const linktoseeresults = "http://localhost:8000/api/results/";

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}


document.addEventListener('DOMContentLoaded', async () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    const IS_STUDENT = getJSON('is_student');
    const no_results = JSON.stringify('no results');

    response = await fetch(linktoseeresults, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
        }
    });

    const results = await response.json();
    console.log(JSON.stringify(results) == JSON.stringify('no results'))
    console.log('kya hai')
    if (!AUTH_KEY || IS_STUDENT !== true) {
        console.log('kyu')
        alert('Access denied. Please log in as a student.');
        window.location.href = 'login.html'; // Redirect to login page

    } else if (results != "no results"){
        console.log('bkl')
        alert('You have already given the exam. Check results!');
        window.location.href = 'result-home.html'

    } else {
        console.log('hello bc')
        student_class = window.localStorage.getItem('classes')
        const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');

        try {
            const params = new URLSearchParams(window.location.search);
            const courses = params.get('course'); 
            const classes = params.get('class')
            //console.log(courses)
            const response = await fetch(getexamlink);
            const exams_data = await response.json();

            for (let i = 0; i < exams_data.length; i++) {
                const exam = exams_data[i];
                //console.log('outside')
                if (exam.courses == courses && exam.classes == classes && student_class == classes) {
                    //console.log('inside')
                    institute = exam.institute
                    console.log(institute)
                    const Questions = JSON.parse(exam.questions.replace(/'/g, '"'));
                    document.getElementById('course-name').textContent = courses;
                    document.getElementById('student-name').textContent = AUTH_KEY;
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
                
                    document.getElementById('submitBtn').addEventListener('click', async (event) => {
                        event.preventDefault();
                        const answer = {};

                        allRadios.forEach(radio => {
                            const questionIndex = radio.getAttribute('data-question-index');
                            const questionKey = `question${parseInt(questionIndex) + 1}`;

                            if (!answer[questionKey]){
                                answer[questionKey] = 'not-answered';
                            }
                            if (radio.checked){
                                answer[questionKey] = radio.id;
                            }
                        });


                        const payload = {
                            answers: JSON.stringify(answer)
                        }
                        //let original = { courses: courses };
                        const answers = payload.answers
                        const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
                        const original = { AUTHKEY, courses, answers };

                        console.log('outside')
                        const headers = {'Content-Type':'application/json',
                            'Access-Control-Allow-Origin':'*',
                            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
                        
                        
                        try{   
                            console.log('inside') 
                            response = await fetch(postanswerslink, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify(original),
                            });
                            alert('Exam submitted successfully!')
                            window.location.href = 'results-home.html'
                            //console.log('inside') 
                            //if (response.ok){
                            //    console.log('response.ok')
                            //    alert('Submission Successful!');
                            //    //console.log(responseData);
                            //} else {
                            //    const error = response.JSON();
                            //    console.log('error')
                            //    alert('error', error)
                            //    event.preventDefault();
                            //}
                        } catch (err) {
                            //alert('error')
                            alert('yayy submitted')
                            console.error("Error:", err)
                        }
                    });
                }   
            }
        } catch (error) {
            console.error('Error adding exam paper:', error);
        }
        
    }
});
        

//const examStartTime = new Date(exam.start_time + " UTC");
//const currentTime = new Date();
//if (currentTime < examStartTime) {
//    alert(`The exam will be available at ${examStartTime.toLocaleString()}`);
//    window.location.href = "exam-home.html"; // Redirect back
//    return;
//}

