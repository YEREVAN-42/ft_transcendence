function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    var toggleButton = document.querySelector("#" + inputId + " + .toggle-password i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.classList.remove("fa-eye");
        toggleButton.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleButton.classList.remove("fa-eye-slash");
        toggleButton.classList.add("fa-eye");
    }
}

document.getElementById("forSubmit").addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent the form from submitting
        alert("Please, fill in all fields!"); // Show an alert message
    }
    else if (!validatePasswords() && validateForm()) {
        event.preventDefault(); // Prevent the form from submitting
        alert("Passwords do not match!"); // Show an alert message
    }
    else {
        event.preventDefault();
        var randomNumber = Math.floor(Math.random() * 90000) + 10000;
        var confirmation_code = randomNumber.toString();
        console.log("confirmation_code =", confirmation_code);
        emailjs.init("19x4j0o_9StkaTZq-");
        var templateParams = {
            to_name: "Aram",
            code: confirmation_code,
            email: document.getElementById("email").value
        };
        emailjs.send("service_en491cd", "template_jhsyjbb", templateParams)
        .then(function(response) {
            console.log("Email sent successfully:", response);
        }, function(error) {
            console.error("Failed to send email:", error);
        });
        // var email = document.getElementById("email").value;
        // fetch("http://localhost:8000/confirm/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //     })
        // })
        // .then(response => {
        //     if (response.ok) {
        //         // If the request was successful, redirect to the confirmation page
        //         window.location.href = "/confirm/";
        //     } else {
        //         // If there was an error, display an error message
        //         alert("Failed to send confirmation email. Please try again.");
        //     }
        // })
        // .catch(error => {
        //     console.error("Error:", error);
        //     alert("An error occurred. Please try again later.");
        // });
        window.location.href = "/confirm/"; // Redirect to page2.html
    }
});

function validateForm() {
    var input1 = document.getElementById("name").value;
    var input2 = document.getElementById("username").value;
    var input3 = document.getElementById("email").value;
    var input4 = document.getElementById("password").value;
    var input5 = document.getElementById("repeat-password").value;
    return input1 !== "" && input2 !== "" && input3 !== "" && input4 !== "" && input5 !== "";
}

function validatePasswords() {
    var password1 = document.getElementById("password").value;
    var password2 = document.getElementById("repeat-password").value;
    return password1 === password2;
}