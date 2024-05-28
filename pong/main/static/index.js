const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};
const routes = {
    // 404: "{% url 'error' %}",
	"/": "{% url 'index' %}",
	"/home": "{% url 'home' %}",
	"/signin": "{% url 'signin' %}",
	"/signup": "{% url 'signup' %}",
	"/confirm": "{% url 'confirm' %}",
	"/intra": "{% url 'intra' %}",
	"/profile": "{% url 'profile' %}",
	"/local_game": "{% url 'local_game' %}",
	"/match_history": "{% url 'match_history' %}",
	"/tournaments": "{% url 'tournaments' %}",
	"/settings": "{% url 'settings' %}",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

document.addEventListener("DOMContentLoaded", function() {
    var languageSelect = document.getElementById("languageSelect");
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = selectedLanguage;

    function switchLanguage(language) {
        var translations = {
            "en": {
                "header":"Welcome to Pong Game! Let's Play and Connect!",
                "text": "Play the classic Pong game, chat with friends, and compete in real-time matches.",
                "buttonSignIn": "Sign In",
                "buttonSignUp": "Sign Up",
                "or":"OR"
            },
            "hy": {
                "header":"Բարի գալուստ Pong Game: Եկեք խաղանք և միացնենք:",
                "text": "Խաղացեք դասական Pong խաղը, զրուցեք ընկերների հետ և մրցեք իրական ժամանակի խաղերում:",
                "buttonSignIn": "Մուտք գործել",
                "buttonSignUp": "Գրանցվել",
                "or":"ԿԱՄ"
            },
            "ru": {
                "header":"Добро пожаловать в игру «Понг»! Давайте играть и общаться!",
                "text": "Играйте в классическую игру «Понг», общайтесь с друзьями и соревнуйтесь в матчах в реальном времени.",
                "buttonSignIn": "Войти",
                "buttonSignUp": "Зарегистрироваться",
                "or":"ИЛИ"
            },
            "cn": {
                "header":"歡迎來到乒乓球遊戲！ 讓我們一起玩耍並聯繫吧!",
                "text": "玩經典的乒乓球遊戲，與朋友聊天，並參加即時比賽。",
                "buttonSignIn": "登入",
                "buttonSignUp": "報名",
                "or":"或"
            }
        };
        document.getElementById("header").textContent = translations[language]["header"];
        document.getElementById("text").textContent = translations[language]["text"];
        document.getElementById("buttonSignIn").textContent = translations[language]["buttonSignIn"];  
        document.getElementById("or").textContent = translations[language]["or"];
        document.getElementById("buttonSignUp").textContent = translations[language]["buttonSignUp"];
    }
    languageSelect.addEventListener("change", function() {
        var selectedLanguage = languageSelect.value;
        switchLanguage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
    });
});

document.addEventListener('DOMContentLoaded', switchLanguage);