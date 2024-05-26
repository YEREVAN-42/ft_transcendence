function applyLanguage() {
  const language = localStorage.getItem('selectedLanguage') || 'en';
  document.documentElement.lang = language;

  const translations = {
          "en": {
              "header":"Welcome back",
              "text": "Signin to your account",
              "buttonSignIn":"Sign in",
              "continue":"Continue with 42Intra",
              "email":"Email",
              "password":"Password"
          },
          "hy": {
              "header":"Բարի գալուստ",
              "text": "Մուտք գործեք ձեր հաշիվ",
              "buttonSignIn":"Մուտք գործել",
              "continue":"Շարունակեք 42Intra-ով",
              "email":"էլ հասցե",
              "password":"Գաղտնաբառ"
          },
          "ru": {
              "header":"Добро пожаловать",
              "text": "Войдите в свой аккаунт",
              "buttonSignIn":"Войти",
              "continue":"Продолжить с 42Intra",
              "email":"Электронная почта",
              "password":"Пароль"
          },
          "cn": {
              "header":"歡迎回來",
              "text": "登入您的帳戶",
              "buttonSignIn":"登入",
              "continue":"繼續 42Intra",
              "email":"電子郵件",
              "password":"密碼"
          },
  };

  document.getElementById('header').innerText = translations[language].header;
  document.getElementById('text').innerText = translations[language].text;
  document.getElementById('buttonSignIn').value = translations[language].buttonSignIn;
  document.getElementById('continue').value = translations[language].continue;
  document.getElementById('email').placeholder = translations[language].email;
  document.getElementById('password').placeholder = translations[language].password;
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
  }
  else{
    event.preventDefault(); // Prevent the form from submitting
    window.location.href = "./home.html"; // Redirect to page2.html
  }
  });
  
  function validateForm() {
  var input1 = document.getElementById("email").value;
  var input2 = document.getElementById("password").value;
  return input1 !== "" && input2 !== "";
  }

document.addEventListener('DOMContentLoaded', applyLanguage);