const getexamlink = "http://localhost:8000/api/exams/get"

document.addEventListener("DOMContentLoaded", () => {
    console.log('hello content loaded')
    try{
        console.log('hello inside try')
        const response = fetch(getexamlink)
        console.log('hello fetched')
        const exams_data = response.json()
        console.log('json')
        //document.getElementById('student-name').textContent = data.student_name;
        //document.getElementById('institute-name').textContent = exams_data.institute;
        document.getElementById('course-name').textContent = exams_data.courses;
        
        const questionContainer = document.getElementById('question-container');
        const questionPalette = document.getElementById('question-palette');
        const totalQuestions = data.questions.length;

        let attemptedCount = 0;
        let notAttemptedCount = totalQuestions;
        
        data.questions.forEach((question, index) => {
            const questionHtml = `
                <div class="mb-4">
                    <h5>${index + 1}. ${question.text}</h5>
                    ${question.options.map((option, i) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="question${index + 1}" id="q${index + 1}a${i + 1}" data-question-index="${index}">
                            <label class="form-check-label" for="q${index + 1}a${i + 1}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            questionContainer.innerHTML += questionHtml;

            // Add question circles in palette
            const circle = document.createElement('div');
            circle.classList.add('question-circle', 'not-seen');
            circle.textContent = index + 1;
            circle.setAttribute('data-question-index', index);
            questionPalette.appendChild(circle);
        });
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.addEventListener('change', function() {
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
            circle.addEventListener('click', function() {
                this.classList.remove('not-seen');
                this.classList.add('seen');
            });
        });
         // Initialize question counts
        document.getElementById('attempted-count').textContent = attemptedCount;
        document.getElementById('not-attempted-count').textContent = notAttemptedCount;
    } catch {
        console.error('error adding exam paper:')
    }
});


