const getexamlink = "http://localhost:8000/api/exams/get";

document.addEventListener("DOMContentLoaded", async () => {
    console.log('hello content loaded');
    try {
        console.log('hello inside try');
        const response = await fetch(getexamlink);
        console.log('hello fetched');
        const exams_data = await response.json();
        console.log(exams_data);

        // Loop through each exam
        for (let i = 0; i < exams_data.length; i++) {
            const exam = exams_data[i];
            const Course = exam.courses;
            const Class = exam.classes;
            const DateScheduled = exam.date_scheduled;
            
            // Parse the stringified 'questions' field from backend
            const Questions = JSON.parse(exam.questions.replace(/'/g, '"')); // Ensure JSON format is correct

            // Update course-name element with course data
            document.getElementById('course-name').textContent = Course;

            const questionContainer = document.getElementById('question-container');
            const questionPalette = document.getElementById('question-palette');
            const totalQuestions = Questions.length;

            let attemptedCount = 0;
            let notAttemptedCount = totalQuestions;

            // Loop through each question in the parsed questions array
            Questions.forEach((question, index) => {
                const questionHtml = `
                    <div class="mb-4">
                        <h5>${index + 1}. ${question.question}</h5>
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

            // Handle radio button change events
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

            // Handle circle click events for marking questions as seen
            const allCircles = document.querySelectorAll('.question-circle');
            allCircles.forEach(circle => {
                circle.addEventListener('click', function () {
                    this.classList.remove('not-seen');
                    this.classList.add('seen');
                });
            });

            // Initialize question counts
            document.getElementById('attempted-count').textContent = attemptedCount;
            document.getElementById('not-attempted-count').textContent = notAttemptedCount;
        }

    } catch (error) {
        console.error('error adding exam paper:', error);
    }
});
