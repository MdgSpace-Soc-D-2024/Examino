// Get elements
const addClassBtn = document.getElementById("addClassBtn");
const classInput = document.getElementById("classInput");
const targetElement = document.getElementById("targetElement");
const showClasses = document.getElementById("showClasses");
const classApiUrl = "http://localhost:8000/api/admin-class/"
// Add event listener to button
//addClassBtn.addEventListener("click", () => {
//    const className = classInput.value.trim();
//    if (className) {
//        // Add class to target element
//        targetElement.classList.add(className);
//
//        // Display the added class in the list
//        const listItem = document.createElement("li");
//        listItem.className = "list-group-item";
//        listItem.textContent = className;
//        showClasses.appendChild(listItem);
//
//        // Clear the input field
//        classInput.value = "";
//    } else {
//        alert("Please enter a valid class name.");
//    }
//});
// Fetch all classes and display them
async function fetchClasses() {
    try {
        const response = await fetch(classApiUrl);
        const classes_data = await response.json();

        const classList = document.getElementById('showClasses');
        classList.innerHTML = ''; // Clear any existing content

        classes_data.forEach(cls => {
            const classItem = document.createElement('div');
            classItem.className = 'mb-2';
            classItem.textContent = cls.classes;
            classList.appendChild(classItem);
        });
    } catch (error) {
        console.error('Error fetching classes:', error);
    }
}

// Add a new class
async function addClass() {
    const classInput = document.getElementById('classInput');
    const className = classInput.value.trim();

    if (!className) {
        alert('Please enter a valid class name.');
        return;
    }

    try {
        const response = await fetch(classApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: className }),
        });

        if (response.ok) {
            classInput.value = ''; // Clear input
            await fetchClasses(); // Refresh class list
        } else {
            const errorData = await response.json();
            alert(`Error adding class: ${errorData.detail || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error adding class:', error);
    }
}

// Attach event listener to the Add Class button
document.getElementById('addClassBtn').addEventListener('click', addClass);

// Fetch and display classes on page load
fetchClasses();
