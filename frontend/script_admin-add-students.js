const classgetApiUrl = "http://localhost:8000/api/admin-class/get/"
const addstudentApiUrl = "http://localhost:8000/api/admin-add-students/"


document.getElementById('addStudentBtn').addEventListener('click', function() {
    // Show the form when the button is clicked
    document.getElementById('studentForm').classList.remove('d-none');
});

// Function to fetch classes from the Django REST backend
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

document.getElementById('studentFormFields').addEventListener('submit', async (event) => {event.preventDefault();
    const username = document.getElementById('username').value;
    const institute = document.getElementById('institute').value;
    const classes = document.getElementById('classDropdown').value;

    // Example form submission to Django backend
    try{
        const response = await fetch(addstudentApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, institute: 1, classes: classes }),
        });
        if (response.ok) {
            const result = await response.json();
            alert('Student added successfully')
            document.getElementById('studentFormFields').reset();
        } else {
            const errorData = await response.json();
            console.error("Adding error:", errorData);
            alert("Error during adding. Check console for details.")

        }
    } catch(error) {
        console.error('Error adding student:', error);
    }
});