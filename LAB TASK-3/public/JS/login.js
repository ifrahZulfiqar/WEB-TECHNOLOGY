
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = form.elements["username"].value;
        const password = form.elements["password"].value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                window.location.href = "/dashboard"; // Redirect to dashboard on successful login
            } else {
                const errorMessage = await response.text();
                alert(errorMessage); // Display error message if login fails
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again."); // Display generic error message
        }
    });
});
