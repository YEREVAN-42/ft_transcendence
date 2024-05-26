function applyLanguage() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

    const translations = {
            "en": {
                "homeheader":"HOME",
                "profile":"PROFILE",
                "setting": "SETTINGS",
                "logout":"LOG OUT",
                "tourn":"Tournaments",
                "user":"Users",
                "resuest":"Requests",
                "tournament":"Tournament",
                "joinTourn":"Join Tournament",
                "h2Header":"Joined Users:",
                "accept-button":"Join",
                "decline-button":"Ignore",
                "invite-button":"Invite"
            },
            "hy": {
                "homeheader":"ԳԼԽԱՎՈՐ",
                "profile":"ՊՐՈՖԻԼ",
                "setting": "ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ",
                "logout":"ԴՈՒՐՍ ԳԱԼ",
                "tourn":"Մրցաշարեր",
                "user":"Օգտատերեր",
                "resuest":"Հարցումներ",
                "tournament":"Մրցաշար",
                "joinTourn":"Միացեք մրցաշարին",
                "h2Header":"Միացած օգտատերեր:",
                "accept-button":"Միանալ",
                "decline-button":"Անտեսել",
                "invite-button":"Հրավիրել"
            },
            "ru": {
                "homeheader":"ГЛАВНАЯ",
                "profile":"ПРОФИЛЬ",
                "setting": "НАСТРОЙКИ",
                "logout":"ВЫЙТИ",
                "tourn":"Турниры",
                "user":"Пользователи",
                "resuest":"Запросы",
                "tournament":"Турнир",
                "joinTourn":"Присоединяйтесь к турниру",
                "h2Header":"Присоединившиеся пользователи:",
                "accept-button":"Присоединиться",
                "invite-button":"Приглашать",
                "decline-button":"Игнорировать"
            },
            "cn": {
                "homeheader":"家",
                "profile":"档案",
                "setting": "設定",
                "logout":"登出",
                "tourn":"錦標賽",
                "user":"使用者",
                "resuest":"要求",
                "tournament":"比賽",
                "joinTourn":"參加錦標賽",
                "h2Header":"已加入用戶:",
                "accept-button":"加入",
                "invite-button":"邀請",
                "decline-button":"忽略"
            },
    };

    const elementsToTranslate = {
        'homeheader': 'homeheader',
        'profile': 'profile',
        'setting': 'setting',
        'logout': 'logout',
        'tourn': 'tourn',
        'user': 'user',
        'resuest': 'resuest',
        'tournament': 'tournament',
        'joinTourn': 'joinTourn',
        'h2Header': 'h2Header'
    };

    Object.keys(elementsToTranslate).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = translations[selectedLanguage][elementsToTranslate[id]];
        }
    });

    const classElementsToTranslate = {
        'accept-button': 'accept-button',
        'invite-button': 'invite-button',
        'decline-button': 'decline-button',
    };

    Object.keys(classElementsToTranslate).forEach(className => {
        const elements = document.getElementsByClassName(className);
        const translationKey = classElementsToTranslate[className];
        Array.from(elements).forEach(element => {
            element.innerText = translations[selectedLanguage][translationKey];
        });
    });

    var invite = document.getElementsByClassName('invite-button');
    for (var i = 0; i < won.length; i++) {
        invite[i].innerText = translations[selectedLanguage].inviteButton;
    }
    var inv = document.getElementsByClassName('ignore-button');
    for (var i = 0; i < won.length; i++) {
        inv[i].innerText = translations[selectedLanguage].ignoreButton;
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

function openTab(evt, tabName) {
    // Get all elements with class="tab-content" and hide them
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tab-button" and remove the class "active"
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// handle joining the tournament

var joinedUsers = 0;

function joinTournament() {
    if (joinedUsers < 4) {
        var userList = document.getElementById("tournamentUserList");
        var user = document.createElement("div");
        user.className = "tournament-user";
        user.innerHTML = `
            <img src="./public/guest.png" alt="User">
            <span>User ${joinedUsers + 1}</span>
        `;
        userList.appendChild(user);
        joinedUsers++;
        
        if (joinedUsers === 4) {
            var newTournamentButton = document.getElementById("newTournamentButton");
            newTournamentButton.style.display = "block";
        }
    }
}

// Start new tournament

function startNewTournament() {
    // Your logic for starting a new tournament
    alert("Starting a new tournament!");
    // Reset the tournament for new users
    var userList = document.getElementById("tournamentUserList");
    userList.innerHTML = '';
    joinedUsers = 0;
    document.getElementById("newTournamentButton").style.display = "none";
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