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
        event.preventDefault(); // Prevent the form from submitting
        window.location.href = "./confirm.html"; // Redirect to page2.html
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