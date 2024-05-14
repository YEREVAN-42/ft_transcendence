function moveFocus(current, next)
{
    var length = document.getElementById(current).value.length;
    var maxLength = document.getElementById(current).getAttribute("maxlength");

    if (length >= maxLength && next)
    {
        document.getElementById(next).focus();
    }
}

function confirmCode() {
    var code = "";
    for (var i = 1; i <= 5; i++)
    {
        code += document.getElementById("digit" + i).value;
    }
    // var confirmation_code = localStorage.getItem("confirmation_code");

    if (code === "12345")//confirmation_code
    {
        document.getElementById("message").innerText = "Confirmation successful!";
        document.getElementById("message").classList.add("success");
        document.getElementById("message").style.display = "block";
        document.querySelector(".loading").style.display = "block";

        const name = localStorage.getItem("name")
        const username = localStorage.getItem("username")
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("password")
        const repeat_password = localStorage.getItem("repeat_password")

        const requestData = {
            name: name,
            username: username,
            email: email,
            password: password,
            repeat_password: password
        };
        
        // Make a POST request to the server
        fetch('http://localhost:8000/confirm/', {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Specify the content type of the request body
            },
            body: JSON.stringify(requestData) // Convert the data to JSON format
        })
        .then(response => {
            // Check if the response is successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        // .then(data => {
        //     // Handle the JSON data received from the server
        //     console.log(data);
        // })
        // .catch(error => {
        //     // Handle any errors that occur during the request
        //     console.error('There was a problem with the fetch operation:', error);
        // });

        console.log("pass = ", password)

        setTimeout(function()
        {
            window.location.href = "/home/"; // Redirect to another page after 2 seconds
        }, 2000);
    }
    else
    {
        document.getElementById("message").innerText = "Invalid confirmation code. Please try again.";
        document.getElementById("message").classList.add("error");
        document.getElementById("message").style.display = "block";
        
        for (var i = 1; i <= 5; i++)
        {
            document.getElementById("digit" + i).value = "";
        }
        document.getElementById("digit1").focus();
    }
}

document.querySelectorAll('.confirmation-code input').forEach(function(input)
{
    input.addEventListener('keydown', function(event)
    {
        if (event.key === 'Enter')
        {
            confirmCode();
        }
    });
});

document.querySelector('button').addEventListener('keydown', function(event)
{
    if (event.key === 'Enter')
    {
        confirmCode();
    }
});