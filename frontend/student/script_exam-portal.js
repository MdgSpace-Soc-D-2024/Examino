const getexamlink = "http://localhost:8000/api/exams/get/";
const postanswerslink = "http://localhost:8000/api/answers/";
const studentcredlink = "http://localhost:8000/api/student-info/get/"
const linktoseeresults = "http://localhost:8000/api/results/check/";

const allRadios = document.querySelectorAll('input[type="radio"]');

function setJSON(key, value) {
    window.localStorage.setItem(key, value);
}
function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}
const params = new URLSearchParams(window.location.search);
const courses = params.get('course'); 
const classes = params.get('class');
const examname = params.get('examname')

document.addEventListener('DOMContentLoaded', async () => {
    const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');
    const IS_STUDENT = getJSON('is_student');
    const no_results = JSON.stringify('no results');
    
    //setJSON('examname', examname)
    response = await fetch(linktoseeresults, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                'username': `Bearer ${AUTH_KEY}`,
                'examname': `Bearer ${examname}`
        }
    });

    const results = await response.json();
    //console.log(JSON.stringify(results) == JSON.stringify('no results'))
    
    if (!AUTH_KEY || IS_STUDENT !== true) {
        
        alert('Access denied. Please log in as a student.');
        window.location.href = 'login.html'; // Redirect to login page

    } else if (results != "no results"){
        
        alert('You have already given the exam. Check results!');
        window.location.href = 'result-home.html'

    } else {
        
        const student_class = window.localStorage.getItem('classes')
        const AUTH_KEY = window.localStorage.getItem('AUTH_KEY');

        try {
            
            //console.log(courses)
            const response = await fetch(getexamlink);
            const exams_data = await response.json();

            for (let i = 0; i < exams_data.length; i++) {
                const exam = exams_data[i];
                //console.log('outside')
                if (exam.courses == courses && exam.classes == classes && student_class == classes && exam.examname == examname) {
                    function startTimer(startTime, endTime) {
                        function parseTime(timeStr) {
                            const [hours, minutes, seconds] = timeStr.split(":").map(Number);
                            return new Date().setHours(hours, minutes, seconds, 0);
                        }
            
                        const start = parseTime(startTime);
                        const end = parseTime(endTime);
                        let timer = Math.floor((end - new Date()) / 1000);
                        let starttimer = Math.floor((start - new Date()) / 1000);
                        if (timer <= 0) {
                            document.getElementById('exam-timer').textContent = "Time's Up";
                            return;
                        } else if (starttimer > 0){
                            alert("Exam hasn't started yet!")
                            window.location.href = "exam-home.html";
                        }
            
                        setInterval(function () {
                            if (timer <= 0) {
                                document.getElementById('exam-timer').textContent = "Time's Up";
                                alert("Time's up!")
                                submitexam();
                                window.location.href = 'result-home.html'
                            }
            
                            const hours = Math.floor(timer / 3600);
                            const minutes = Math.floor((timer % 3600) / 60);
                            const seconds = timer % 60;
            
                            document.getElementById('exam-timer').textContent =
                                (hours < 10 ? "0" + hours : hours) + ":" +
                                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                                (seconds < 10 ? "0" + seconds : seconds);
            
                            timer--;
                        }, 1000);
                    }
            
                    
                    console.log(exam)
                    startTimer(exam.start_time, exam.end_time)
                    
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
                        submitexam();
                    });
                    
                    
                    }
                }   
            
        } catch (error) {
            
            console.error('Error adding exam paper:', error);
        }
        
    }
});
        

async function submitexam(){
        
    const answer = {};
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
    const params = new URLSearchParams(window.location.search);
    const courses = params.get('course'); 
    //let original = { courses: courses };
    const answers = payload.answers
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    const original = { AUTHKEY, courses, answers };
    
    console.log('outside')
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
        'examname': `Bearer ${examname}`}
    
    console.log(original)
    try{   
        console.log('inside') 
        const response =  await fetch(postanswerslink, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(original),
        });
        //alert('Exam submitted successfully!')
        //
        console.log('inside') 
        if (response.ok){
            console.log('response.ok')
            //
            window.location.href = 'result-home.html'
            alert('Submission Successful!');
            
        } else {
            const error = await response.json();
            console.log('error')
            alert('error', error)
            //event.preventDefault();
        }
    } catch (err) {
        alert(err)
        
        console.error("Error:", err)
    }
}

