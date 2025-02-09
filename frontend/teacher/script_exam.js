const teacherexamApiUrl = "http://localhost:8000/api/teacher-exam/"
const classgetApiUrl = "http://localhost:8000/api/admin-class/teacher/get/"
const coursegetApiUrl = "http://localhost:8000/api/admin-courses/teacher/get/"

function getJSON(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
function clearJSON() {
    window.localStorage.clear();
}

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
    const AUTH_KEY = JSON.stringify(getJSON('AUTH_KEY'));
    const IS_TEACHER = getJSON('is_teacher');
    
    if (!AUTH_KEY || IS_TEACHER !== true) {
        alert('Access denied. Please log in as a teacher.');
        window.location.href = 'login.html'; 
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  async function fetchClasses() {
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    try {
        const response = await fetch(classgetApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTHKEY}`,
            },
        });

        if (response.ok) {
            const classes_data = await response.json();
            
            const myclasses = classes_data.classes
            try {
                const classDropdown = document.getElementById('classDropdown');
                
                var objs = JSON.parse(myclasses);
                console.log(objs)
                objs.forEach(obj => {
                    const option = document.createElement('option');
                    option.textContent += obj
                    classDropdown.appendChild(option);
                });
            } catch (ex) {
                console.error(ex);
            }
         } else {
             const errorData = await response.json();
             alert(`Error adding class: ${errorData.detail || 'Unknown error'}`);
         }
    
    } catch (error) {
        console.error('Error adding class:', error);
    }
        
  } 

  fetchClasses();
  async function fetchCourses(event) {
    // event.preventDefault();
    const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
    try {
        const response = await fetch(coursegetApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': `Bearer ${AUTHKEY}`,
            },
        });

        if (response.ok) {
            const courses_data = await response.json();
            // console.log(courses_data)
            const mycourses = courses_data.courses
            try {
                const courseDropdown = document.getElementById('courseDropdown');
                
                var objs = JSON.parse(mycourses);
                console.log(objs)
                objs.forEach(obj => {
                    const option = document.createElement('option');
                    option.textContent += obj
                    courseDropdown.appendChild(option);
                });
            } catch (ex) {
                console.error(ex);
            }
         } else {
             const errorData = await response.json();
             alert(`Error adding course: ${errorData.detail || 'Unknown error'}`);
         }
    
    } catch (error) {
        console.error('Error adding course:', error);
    }
        
  } 
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
      const examstartTime = document.getElementById("examstartTime").value;
      const examendTime = document.getElementById("examendTime").value;
      const examname = document.getElementById("examname").value;
    
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
      const AUTHKEY = window.localStorage.getItem('AUTH_KEY')
      // Serialize questions array to JSON string before sending to backend
      const examData = {
        AUTHKEY: AUTHKEY,
        examname: examname,
        classes: classSelected,
        courses: courseSelected,
        date_scheduled: examDate,
        start_time: examstartTime,
        end_time: examendTime,
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
  function logout() {
    clearJSON(); 
    alert('Logged out successfully');
    window.location.href = '../home.html'; 
}

const logoutLink = document.getElementById('Logout');
if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
    });
}