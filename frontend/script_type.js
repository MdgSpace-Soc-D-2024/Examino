const linktotype = "http://localhost:8000/api/type/"

document.getElementById("typeModal").addEventListener("submit", async(event) => {event.preventDefault();

    const type_of = document.getElementById('giveRole').value
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'}
    
    try {
        const response = await fetch(linktotype, {
            statusCode: 200,
            method: "POST",
            headers: headers,
            body: JSON.stringify({ type_of }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Detail successfully added.');
            //window.location.href ="http://localhost:8000/api/"
        } else {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            alert("Error during submitting. Check console for details.")
        }
    } catch (error) {
        console.error("Error:", error);
    }

});