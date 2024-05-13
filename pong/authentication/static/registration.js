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
    if (!validateForm())
    {
        event.preventDefault(); // Prevent the form from submitting
        alert("Please, fill in all fields!"); // Show an alert message
    }
    else if (!validatePasswords() && validateForm())
    {
        event.preventDefault(); // Prevent the form from submitting
        alert("Passwords do not match!"); // Show an alert message
    }
    else
    {
        event.preventDefault();
        var randomNumber = Math.floor(Math.random() * 90000) + 10000;
        var confirmation_code = randomNumber.toString();
        
        localStorage.setItem('confirmation_code', confirmation_code)
       
        emailjs.init("19x4j0o_9StkaTZq-");
        var templateParams = {
            to_name: document.getElementById("name").value,
            code: confirmation_code,
            email: document.getElementById("email").value
        };
        emailjs.send("service_en491cd", "template_jhsyjbb", templateParams)
        .then(function(response)
        {
            console.log("Email sent successfully:", response);
            window.location.href = "/confirm/";
        }, function(error)
        {
            console.error("Failed to send email:", error);
        });
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