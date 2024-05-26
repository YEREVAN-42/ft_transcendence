function applyLanguage() {
    const language = localStorage.getItem('selectedLanguage') || 'en';
    document.documentElement.lang = language;
  
    const translations = {
            "en": {
                "name":"Name",
                "username": "Username",
                "email":"Email",
                "password":"Password",
                "repeatPassword":"Repeat Password",
                "registr":"Registration",
                "text":"Fill in the fields below",
                "continue": "Continue"
            },
            "hy": {
                "name":"Անուն",
                "username": "Օգտանուն",
                "email":"էլ հասցե",
                "password":"Գաղտնաբառ",
                "repeatPassword":"Կրկնեք գաղտնաբառը",
                "registr":"Գրանցում",
                "text":"Լրացրե՛ք ստորև նշված դաշտերը",
                "continue": "Շարունակել"
            },
            "ru": {
                "name":"Имя",
                "username": "Имя пользователя",
                "email":"Электронная почта",
                "password":"Пароль",
                "repeatPassword":"Повторите пароль",
                "registr":"Регистрация",
                "text":"Заполните поля ниже",
                "continue": "Продолжать"
            },
            "cn": {
                "name":"姓名",
                "username": "使用者名稱",
                "email":"電子郵件",
                "password":"密碼",
                "repeatPassword":"重複輸入密碼",
                "registr":"登記",
                "text":"填寫下面的字段",
                "continue": "繼續"
            },
    };
  
    document.getElementById('name').placeholder = translations[language].name;
    document.getElementById('username').placeholder = translations[language].username;
    document.getElementById('email').placeholder = translations[language].email;
    document.getElementById('password').placeholder = translations[language].password;
    document.getElementById('repeat-password').placeholder = translations[language].repeatPassword;
    document.getElementById('registr').innerText = translations[language].registr;
    document.getElementById('text').innerText = translations[language].text;
    document.getElementById('continue').value = translations[language].continue;
  }

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
    const language = localStorage.getItem('selectedLanguage') || 'en';
    if (!validateForm()) {
        event.preventDefault(); // Prevent the form from submitting
        var texts = {
            "en": "Please, fill in all fields!",
            "hy": "Խնդրում ենք լրացնել բոլոր դաշտերը:",
            "ru": "Пожалуйста, заполните все поля!",
            "cn": "請填寫所有欄位！"
        };
        alert(texts[language]); // Show an alert message
        // alert("Please, fill in all fields!"); // Show an alert message
    }
    else if (!validatePasswords() && validateForm()) {
        event.preventDefault(); // Prevent the form from submitting
        var texts = {
            "en": "Passwords do not match!",
            "hy": "Գաղտնաբառերը չեն համապատասխանում",
            "ru": "Пароли не совпадают!",
            "cn": "密碼不匹配！"
        };
        alert(texts[language]); // Show an alert message
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


  document.addEventListener('DOMContentLoaded', applyLanguage);