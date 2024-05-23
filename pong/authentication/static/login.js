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

function hashPassword(password)
{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    // const hash = crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(data))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function extractUserIdFromToken(token) {
    // Decode the JWT token to extract the user ID
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    const decodedToken = JSON.parse(jsonPayload);
    return decodedToken.user_id;
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
                    localStorage.setItem('access', data.access);
                    localStorage.setItem('refresh', data.refresh);

                    const userId = extractUserIdFromToken(data.access);
                    if (!userId)
                    {
                      alert('Invalid token. Please log in again.');
                      window.location.href = '/';
                      return;
                    }
                  
                    const url = `http://localhost:8000/api/v1/home/${userId}/`;
                    window.location.href = url;
                }
            })
        .catch(error =>
        {
            alert("Invalid email or password!");
            console.error('There has been a problem with your fetch operation:', error);
        });
        
    }
});
 
//Continue submition with "Continue with 42intra" button
document.getElementById("continue").addEventListener("click", function()
{
    window.location.href = "http://localhost:8000/auth/42/";
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