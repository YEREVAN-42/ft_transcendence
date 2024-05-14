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
    else{
      event.preventDefault(); // Prevent the form from submitting
      const requestData = {
        email: email,
        password: password
    };
    
    fetch('http://localhost:8000/signin/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    window.location.href = "/home/"; // Redirect to page2.html
    }
    });
  
    function validateForm() {
    var input1 = document.getElementById("email").value;
    var input2 = document.getElementById("password").value;
    return input1 !== "" && input2 !== "";
}

function redirectToHome() {
    window.location.href = "/"; // Redirect to the home page
}