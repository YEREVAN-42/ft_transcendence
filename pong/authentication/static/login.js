var input1, input2;

let INTRA_API_URL="https://api.intra.42.fr/";
let INTRA_API_UID="u-s4t2ud-d934927d41b1907cf997e49d099e6a5635f0dcf9a6ad1b0d05b47180b7bcea9d";
let INTRA_REDIRECT_URI="http://10.12.17.4:8000/home/";


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

async function hashPassword(password) {
    if (window.crypto && window.crypto.subtle) {
        // Modern browsers with Web Crypto API support
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        try {
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        } catch (error) {
            console.error('Error hashing password with Web Crypto API:', error);
            throw error;
        }
    } else {
        // Fallback for older browsers without Web Crypto API support
        try {
            const hash = CryptoJS.SHA256(password);
            return hash.toString(CryptoJS.enc.Hex);
        } catch (error) {
            console.error('Error hashing password with crypto-js:', error);
            throw error;
        }
    }
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
    //Check if all fields are filled and 
    if (document.activeElement.id === "continue"){
        return;
    }
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
        fetch('http://10.12.17.4:8000/signin/',
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
                  
                    const url = `http://10.12.17.4:8000/home/`;
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
 
// Continue submition with "Continue with 42intra" button
document.getElementById("continue").addEventListener("click", function()
{
    window.location.href = `${INTRA_API_URL}/oauth/authorize?client_id=${INTRA_API_UID}&redirect_uri=${INTRA_REDIRECT_URI}&response_type=code`

    
    //fetch code to login view
    // url = `http://api/v1/login/`
    // fetch(url, {
    //     method: 'POST',
    //     headers:
    //     {
    //         'Content-Type': 'application/json'
    //     },
    //     // body: JSON.stringify(requestData)
    // })
    // .then(response =>
    // {
    //     if (!response.ok)
    //     {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    
    
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