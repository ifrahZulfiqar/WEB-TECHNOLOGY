document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = form.elements["email"].value;
        const password = form.elements["password"].value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                window.location.href = "/landingpage"; // Redirect to dashboard on successful login
            } else {
                const errorData = await response.json();
                alert(errorData.message); // Display error message
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again."); // Display generic error message
        }
    });
});
