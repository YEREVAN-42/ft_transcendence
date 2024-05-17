var input1, input2, input3, input4, input5;

function togglePasswordVisibility(inputId)
{
    var passwordInput = document.getElementById(inputId);
    var toggleButton = document.querySelector("#" + inputId + " + .toggle-password i");

    if (passwordInput.type === "password")
    {
        passwordInput.type = "text";
        toggleButton.classList.remove("fa-eye");
        toggleButton.classList.add("fa-eye-slash");
    }
    else
    {
        passwordInput.type = "password";
        toggleButton.classList.remove("fa-eye-slash");
        toggleButton.classList.add("fa-eye");
    }
}

async function hashPassword(password)
{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

document.getElementById("forSubmit").addEventListener("submit", async function(event)
{
    event.preventDefault();

    if (!validateForm()) {
        alert("Please, fill in all fields!");
    }
    else if (!validatePasswords())
    {
        alert("Passwords do not match!");
    }
    else
    {
        event.preventDefault();
        var randomNumber = Math.floor(Math.random() * 90000) + 10000;
        var confirmation_code = randomNumber.toString();
        
        const hashedPassword = await hashPassword(input4);
        
        document.getElementById("password").value = hashedPassword;
        document.getElementById("repeat-password").value = hashedPassword;
        
        localStorage.setItem('confirmation_code', confirmation_code)
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("username", document.getElementById("username").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("password", document.getElementById("password").value);

        document.getElementById("password").value = input4;
        document.getElementById("repeat-password").value = input5;

        // emailjs.init("19x4j0o_9StkaTZq-");
        // var templateParams = {
        //         to_name: input1,
        //         code: confirmation_code,
        //         email: input3
        //     };
        //     emailjs.send("service_en491cd", "template_jhsyjbb", templateParams)
        //     .then(function(response)
        //     {
        //             console.log("Email sent successfully:", response);
        //                 window.location.href = "/confirm/";
        //         }, function(error)
        //         {
        //                 console.error("Failed to send email:", error);
        //             });

        
    }
    window.location.href = "/confirm/"; // this line will be deleted
});

function validateForm()
{
    input1 = document.getElementById("name").value
    input2 = document.getElementById("username").value
    input3 = document.getElementById("email").value
    input4 = document.getElementById("password").value
    input5 = document.getElementById("repeat-password").value
    return input1 !== "" && input2 !== "" && input3 !== "" && input4 !== "" && input5 !== "";
}

function validatePasswords()
{
    var password1 = document.getElementById("password").value;
    var password2 = document.getElementById("repeat-password").value;
    
    return password1 === password2;
}