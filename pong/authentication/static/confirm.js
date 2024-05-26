function moveFocus(current, next)
{
    var length = document.getElementById(current).value.length;
    var maxLength = document.getElementById(current).getAttribute("maxlength");

    if (length >= maxLength && next)
    {
        document.getElementById(next).focus();
    }
}

function confirmCode()
{
    var code = "";
    for (var i = 1; i <= 5; i++)
    {
        code += document.getElementById("digit" + i).value;
    }
    //var confirmation_code = localStorage.getItem("confirmation_code");

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

        const requestData = {
            name: name,
            username: username,
            email: email,
            password: password,
        };
        
        fetch('http://10.12.17.4:8000/confirm/', {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        setTimeout(function()
        {
            alert('Confirmation successful!');
            window.location.href = "/";
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