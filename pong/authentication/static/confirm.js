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
    var confirmation_code = localStorage.getItem('confirmation_code');

    if (code === confirmation_code)
    {
        document.getElementById("message").innerText = "Confirmation successful!";
        document.getElementById("message").classList.add("success");
        document.getElementById("message").style.display = "block";
        document.querySelector(".loading").style.display = "block";
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