const teacherexamApiUrl = "http://localhost:8000/api/teacher-exam/"
const classgetApiUrl = "http://localhost:8000/api/admin-class/get/"
const coursegetApiUrl = "http://localhost:8000/api/admin-courses/get/"







document.addEventListener("DOMContentLoaded", () => {
  async function fetchClasses() {
    const response_class = await fetch(classgetApiUrl);
    const classes_data = await response_class.json();
    console.log(classes_data)
    const classDropdown = document.getElementById('classDropdown');
    classes_data.forEach(cls => {
        const option = document.createElement('option');
       // option.value = cls.id;
        option.textContent = cls.classes;
        classDropdown.appendChild(option);
    });
  };
  fetchClasses();
  async function fetchCourses() {
    const response_course = await fetch(coursegetApiUrl);
    const courses_data = await response_course.json();
    console.log(courses_data)
    const courseDropdown = document.getElementById('courseDropdown');
    courses_data.forEach(crs => {
        const option = document.createElement('option');
       // option.value = cls.id;
        option.textContent = crs.courses;
        courseDropdown.appendChild(option);
    });
  };
  
  
  fetchCourses();
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

    
    submitBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const classSelected = document.getElementById("classDropdown").value;
      const courseSelected = document.getElementById("courseDropdown").value;
      const examDate = document.getElementById("examDate").value;
    
      if (!classSelected || !courseSelected || !examDate) {
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
    
      // Serialize questions array to JSON string before sending to backend
      const examData = {
        institute: 1,
        classes: classSelected,
        courses: courseSelected,
        date_scheduled: examDate,
        questions: JSON.stringify(questions) // Convert array to JSON string
      };
    
      const headers = {
        'Content-Type': 'application/json'
      };
    
      try {
        const response = await fetch(teacherexamApiUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(examData)
        });
    
        if (response.ok) {
          const result = await response.json();
          alert('Exam Created');
        } else {
          const errorData = await response.json();
          console.error("Registration error:", errorData);
          alert("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
    
    
  });