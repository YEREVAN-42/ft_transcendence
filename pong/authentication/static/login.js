var input1, input2;

function togglePasswordVisibility(inputId)
{
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
    
    if (!validateForm())
    {
      alert("Please, fill in all fields!");
    }
    else
    {
        const hashedPassword = await hashPassword(input2);
        const requestData = 
        {
            email: input1,
            password: hashedPassword
        };
        fetch('http://localhost:8000/signin/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data =>
            {
                console.log(data);
                if (data.status === "error")
                {
                    alert(data.message);
                }
                else
                {
                    window.location.href = "/home/";
                }
            })
        .catch(error =>
        {
            alert("Invalid email or password!");
            console.error('There has been a problem with your fetch operation:', error);
        });
        
    }
});
  
function validateForm()
{
    input1 = document.getElementById("email").value;
    input2 = document.getElementById("password").value;
    return input1 !== "" && input2 !== "";
}

function redirectToHome()
{
    window.location.href = "/";
}