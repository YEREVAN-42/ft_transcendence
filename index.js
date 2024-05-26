document.addEventListener("DOMContentLoaded", function() {
    var languageSelect = document.getElementById("languageSelect");
    var header = document.getElementById("header");
    var text = document.getElementById("text");
    var buttonSignIn = document.getElementById("buttonSignIn");
    var buttonSignUp = document.getElementById("buttonSignUp");
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

    languageSelect.value = selectedLanguage;
    switchLanguage(selectedLanguage);

    languageSelect.addEventListener("change", function() {
        var selectedLanguage = languageSelect.value;
        switchLanguage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
    });

    function switchLanguage(language) {
        var translations = {
            "en": {
                "header":"Welcome to Pong Game! Let's Play and Connect!",
                "text": "Play the classic Pong game, chat with friends, and compete in real-time matches.",
                "buttonSignIn": "Sign In",
                "buttonSignUp": "Sign Up"
            },
            "hy": {
                "header":"Բարի գալուստ Pong Game: Եկեք խաղանք և միացնենք:",
                "text": "Խաղացեք դասական Pong խաղը, զրուցեք ընկերների հետ և մրցեք իրական ժամանակի խաղերում:",
                "buttonSignIn": "Մուտք գործել",
                "buttonSignUp": "Գրանցվել",
            },
            "ru": {
                "header":"Добро пожаловать в игру «Понг»! Давайте играть и общаться!",
                "text": "Играйте в классическую игру «Понг», общайтесь с друзьями и соревнуйтесь в матчах в реальном времени.",
                "buttonSignIn": "Войти",
                "buttonSignUp": "Зарегистрироваться",
            },
            "cn": {
                "header":"歡迎來到乒乓球遊戲！ 讓我們一起玩耍並聯繫吧!",
                "text": "玩經典的乒乓球遊戲，與朋友聊天，並參加即時比賽。",
                "buttonSignIn": "登入",
                "buttonSignUp": "報名",
          }
        };
        header.textContent = translations[language]["header"];
        text.textContent = translations[language]["text"];
        buttonSignIn.textContent = translations[language]["buttonSignIn"];  
        buttonSignUp.textContent = translations[language]["buttonSignUp"];
    }
});
