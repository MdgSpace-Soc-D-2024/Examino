// Get elements
const addClassBtn = document.getElementById("addClassBtn");
const classInput = document.getElementById("classInput");
const targetElement = document.getElementById("targetElement");

// Add event listener to button
addClassBtn.addEventListener("click", () => {
    const className = classInput.value.trim();
    if (className) {
        targetElement.classList.add(className);
        alert(`Class "${className}" added to the target element.`);
    } else {
        alert("Please enter a valid class name.");
    }
});