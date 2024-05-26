function moveFocus(current, next) {
    var length = document.getElementById(current).value.length;
    var maxLength = document.getElementById(current).getAttribute("maxlength");

    if (length >= maxLength && next) {
        document.getElementById(next).focus();
    }
}

function confirmCode() {
    var code = "";
    for (var i = 1; i <= 5; i++) {
        code += document.getElementById("digit" + i).value;
    }

    if (code === "12345") { // Replace "12345" with the actual confirmation code
        document.getElementById("message").innerText = "Confirmation successful!";
        document.getElementById("message").classList.add("success");
        document.getElementById("message").style.display = "block";
        document.querySelector(".loading").style.display = "block";
        setTimeout(function() {
            window.location.href = "./home.html"; // Redirect to another page after 2 seconds
        }, 2000);
    } else {
        document.getElementById("message").innerText = "Invalid confirmation code. Please try again.";
        document.getElementById("message").classList.add("error");
        document.getElementById("message").style.display = "block";
        
        for (var i = 1; i <= 5; i++) {
            document.getElementById("digit" + i).value = "";
        }
        document.getElementById("digit1").focus();
    }
}

function switchLanguage(language) {
    var translations = {
        "en": {
            "confirmEmail":"Confirm your Email",
            "enterConfirm":"Please enter the confirmation code sent to your email:",
            "confirmButton":"Confirm"
        },
        "hy": {
            "confirmEmail":"Հաստատեք ձեր էլ հասցեն",
            "enterConfirm":"Խնդրում ենք մուտքագրել հաստատման կոդը, որն ուղարկվել է ձեր էլ հասցեն",
            "confirmButton":"Հաստատել"
        },
        "ru": {
            "confirmEmail":"Подтвердите ваш адрес электронной почты",
            "enterConfirm":"Пожалуйста, введите код подтверждения, отправленный на вашу электронную почту:",
            "confirmButton":"Подтверждать"
        },
        "cn": {
            "confirmEmail":"確認您的電子郵件",
            "enterConfirm":"請輸入寄至您信箱的確認碼：",
            "confirmButton":"確認"
      }
    };

    homeLink.textContent = translations[language]["home"];
    howToPlayHeader.textContent = translations[language]["howToPlayHeader"];
    howToPlayText.textContent = translations[language]["howToPlayText"];  
    profileLink.textContent = translations[language]["profileLink"];
    playButton.textContent = translations[language]["playButton"];
  }
  switchLanguage(languageSelect.value);

document.querySelectorAll('.confirmation-code input').forEach(function(input) {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            confirmCode();
        }
    });
});

document.querySelector('button').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        confirmCode();
    }
});