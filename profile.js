function applyLanguage() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

    const translations = {
            "en": {
                "homeheader":"HOME",
                "profile":"PROFILE",
                "setting": "SETTINGS",
                "logout":"LOG OUT",
                "prof":"Profile",
                "guest": "Username",
                "listHeader":"Friends List",
                "searchInput":"Search friends...",
                "friends":"Friends",
                "request": "Requests",
                "users":"Users",
                "removeButton":"Remove",
                "accept":"Accept",
                "decline":"Decline",
                "add":"Add",
                "matchHistory":"Match history",
                "turm":"Tournaments"
            },
            "hy": {
                "homeheader":"ԳԼԽԱՎՈՐ",
                "profile":"ՊՐՈՖԻԼ",
                "setting": "ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ",
                "logout":"ԴՈՒՐՍ ԳԱԼ",
                "prof":"Անձնական էջ",
                "guest": "Օգտանունը",
                "listHeader":"Ընկերների ցանկ",
                "searchInput":"Փնտրել ընկերներին...",
                "friends":"Ընկերներ",
                "request": "Հարցումներ",
                "users":"Օգտատերեր",
                "removeButton":"Հեռացնել",
                "accept":"Ընդունել",
                "decline":"Մերժել",
                "add":"Ավելացնել",
                "matchHistory":"Խաղի պատմություն",
                "turm":"Մրցաշարեր"
            },
            "ru": {
                "homeheader":"ГЛАВНАЯ",
                "profile":"ПРОФИЛЬ",
                "setting": "НАСТРОЙКИ",
                "logout":"ВЫЙТИ",
                "prof":"Профиль",
                "guest": "Имя пользователя",
                "listHeader":"Список друзей",
                "searchInput":"Поиск друзей...",
                "friends":"Друзья",
                "request": "Запросы",
                "users":"Пользователи",
                "removeButton":"Удалять",
                "accept":"Принимать",
                "decline":"Отклонить",
                "add":"Добавлять",
                "matchHistory":"История матчей",
                "turm":"Турниры"
            },
            "cn": {
                "homeheader":"家",
                "profile":"档案",
                "setting": "設定",
                "logout":"登出",
                "prof":"輪廓",
                "guest": "使用者名稱",
                "listHeader":"好友列表",
                "searchInput":"搜尋好友...",
                "friends":"朋友們",
                "request": "要求",
                "users":"使用者",
                "removeButton":"消除",
                "accept":"接受",
                "decline":"衰退",
                "add":"添加",
                "matchHistory":"比賽歷史",
                "turm":"錦標賽"
            },
    };
    const elementsToTranslate = {
        'homeheader': 'homeheader',
        'profile': 'profile',
        'setting': 'setting',
        'logout': 'logout',
        'prof': 'prof',
        'guest': 'guest',
        'listHeader': 'listHeader',
        'friends': 'friends',
        'request': 'request',
        'matchHistory': 'matchHistory',
        'users':'users',
        'turm': 'turm'
    };
    
    Object.keys(elementsToTranslate).forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            var translationKey = elementsToTranslate[id];
            element.textContent = translations[selectedLanguage][translationKey];
        }
    });
    document.getElementById('searchInput').placeholder = translations[selectedLanguage].searchInput;

    var detailsButtons = document.getElementsByClassName('details-button');
    for (var i = 0; i < detailsButtons.length; i++) {
        detailsButtons[i].innerText = translations[selectedLanguage].removeButton;
    }
    var declineButtons = document.getElementsByClassName('decline-button');
    var acceptButtons = document.getElementsByClassName('accept-button');
    for (var i = 0; i < declineButtons.length; i++) {
        declineButtons[i].innerText = translations[selectedLanguage].decline;
        acceptButtons[i].innerText = translations[selectedLanguage].accept;
    }
    var addButtons = document.getElementsByClassName('add-button');
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].innerText = translations[selectedLanguage].add;
    }
  }

// JavaScript for the profile menu
document.addEventListener("DOMContentLoaded", function() {
    var profileImage = document.getElementById("profileImage");
    var menu = document.getElementById("menu");

    profileImage.addEventListener("click", function() {
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    });

    // Close the menu when clicking outside of it
    window.addEventListener("click", function(event) {
        if (!event.target.matches("#profileImage") && !event.target.matches(".menu")) {
            menu.style.display = "none";
        }
    });
});

var profilePic = localStorage.getItem('profilePic');
document.getElementById('profileImage').src = profilePic || 'profile.jpg';

var profilePicLarge = localStorage.getItem('profilePicLarge');
document.getElementById('profileImageLarge').src = profilePic || 'profile.jpg';

var profileName = localStorage.getItem('profileName') || 'Guest';
document.getElementById('guest').textContent = profileName;

//All for profile page
document.getElementById('searchInput').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let friends = document.querySelectorAll('.tab-content.active .friend, .tab-content.active .friend-request, .tab-content.active .friend-suggestion');
    friends.forEach(friend => {
        let username = friend.querySelector('.friend-username').textContent.toLowerCase();
        if (username.includes(filter)) {
            friend.style.display = 'flex';
        } else {
            friend.style.display = 'none';
        }
    });
});

function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tabbuttons = document.getElementsByClassName('tab-button');
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.className += ' active';
}

// Set default tab to be opened
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.tab-button').click();
});

function goToMatchHistory() {
    window.location.href = 'match_history.html';
}

function goTournaments() {
    window.location.href = 'tournaments.html';
}

applyLanguage()
// document.addEventListener('DOMContentLoaded', applyLanguage);