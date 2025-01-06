const teacherexamApiUrl = "http://localhost:8000/api/teacher-exam/"
document.addEventListener("DOMContentLoaded", () => {
    const questionsContainer = document.getElementById("questionsContainer");
    const addQuestionBtn = document.getElementById("addQuestionBtn");
    const submitBtn = document.getElementById("submitBtn");

    // Add a new question input
    addQuestionBtn.addEventListener("click", () => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question-container");
      questionDiv.innerHTML = `
        <div class="mb-3">
          <label class="form-label">Question</label>
          <input type="text" class="form-control question-input" placeholder="Enter question" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Options</label>
          <div>
            <input type="text" class="form-control mb-2 option-input" placeholder="Option 1" required>
            <input type="text" class="form-control mb-2 option-input" placeholder="Option 2" required>
            <input type="text" class="form-control mb-2 option-input" placeholder="Option 3" required>
            <input type="text" class="form-control mb-2 option-input" placeholder="Option 4" required>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Correct Answer</label>
          <select class="form-select correct-answer" required>
            <option value="" selected disabled>Choose correct answer</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
            <option value="Option 4">Option 4</option>
          </select>
        </div>
        <hr>
      `;
      questionsContainer.appendChild(questionDiv);
    });

    // Handle form submission
    submitBtn.addEventListener("click", () => {
      const classSelected = document.getElementById("classSelect").value;
      const subjectSelected = document.getElementById("subjectSelect").value;
      const examDate = document.getElementById("examDate").value;

      if (!classSelected || !subjectSelected || !examDate) {
        alert("Please fill in all exam details.");
        return;
      }

      const questions = [];
      document.querySelectorAll(".question-container").forEach((container) => {
        const questionText = container.querySelector(".question-input").value;
        const options = Array.from(container.querySelectorAll(".option-input"), input => input.value);
        const correctAnswer = container.querySelector(".correct-answer").value;

        if (!questionText || options.some(opt => !opt) || !correctAnswer) {
          alert("Please complete all questions with valid data.");
          return;
        }

        questions.push({
          question: questionText,
          options,
          correctAnswer
        });
      });

      if (questions.length === 0) {
        alert("Please add at least one question.");
        return;
      }

      const examData = {
        class_exam: classSelected,
        subject: subjectSelected,
        date_scheduled: examDate,
        questions
      };
      let class_exam = classSelected
      let subject = subjectSelected
      let date_scheduled = examDate
    

      console.log("Exam Data Submitted:", examData);
      alert("Exam scheduled successfully!");
      document.getElementById("examForm").addEventListener("submit", async (event) => {event.preventDefault();
        try {
          const response = await fetch(teacherexamApiUrl, {
              statusCode: 200,
              method: "POST",
              headers: headers,
              body: JSON.stringify({class_exam, subject, date_scheduled, questions}),
          });
          if (response.ok) {
            const result = await response.json();
            alert('Exam Created: ')
          } else {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            alert("Error")
          }
        } catch (error) {
            console.error("Error:", error);
        }
      });
    });
  });