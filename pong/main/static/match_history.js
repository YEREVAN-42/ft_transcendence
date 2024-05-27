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

//For Backend
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/match-history')
        .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => console.error('Error fetching match history:', error));
});

function populateTable(data) {
    const tableBody = document.querySelector('#matchHistoryTable tbody');
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach(match => {
        const row = document.createElement('tr');

        const playerCell = document.createElement('td');
        const playerImage = document.createElement('img');
        playerImage.src = match.profile_picture; // URL to the player's profile picture
        const playerName = document.createTextNode(match.username);
        playerCell.appendChild(playerImage);
        playerCell.appendChild(playerName);
        playerCell.setAttribute('data-label', 'Player List');

        const preferenceCell = document.createElement('td');
        preferenceCell.textContent = match.preference;
        preferenceCell.setAttribute('data-label', 'Preference');

        const pointsCell = document.createElement('td');
        pointsCell.textContent = match.points;
        pointsCell.setAttribute('data-label', 'Points');

        const dateCell = document.createElement('td');
        dateCell.textContent = new Date(match.date).toLocaleDateString();
        dateCell.setAttribute('data-label', 'Date');

        const resultCell = document.createElement('td');
        resultCell.textContent = match.result;
        resultCell.classList.add(match.result.toLowerCase() === 'won' ? 'result-won' : 'result-lose');
        resultCell.setAttribute('data-label', 'Result');

        row.appendChild(playerCell);
        row.appendChild(preferenceCell);
        row.appendChild(pointsCell);
        row.appendChild(dateCell);
        row.appendChild(resultCell);

        tableBody.appendChild(row);
    });
}

function applyLanguage() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    var selectedLanguage = 'hy';

    const translations = {
            "en": {
                "homeheader":"HOME",
                "profile":"PROFILE",
                "setting": "SETTINGS",
                "logout":"LOG OUT",
                "header":"Match History",
                "playerList": "Player List",
                "preference": "Preference",
                "points": "Points",
                "date": "Date",
                "result": "Result",
                "won":"Won",
                "lose":"Lose",
                "arcade":"Arcade",
                "classic":"Classic"
            },
            "hy": {
                "homeheader":"ԳԼԽԱՎՈՐ",
                "profile":"ՊՐՈՖԻԼ",
                "setting": "ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ",
                "logout":"ԴՈՒՐՍ ԳԱԼ",
                "header":"Խաղի պատմություն",
                "playerList": "Խաղացողների ցանկ",
                "preference": "Նախապատվություն",
                "points": "Միավորներ",
                "date": "Ամսաթիվ",
                "result": "Արդյունք",
                "won":"Հաղթանակ",
                "lose":"Պարտություն",
                "arcade":"Արկադային",
                "classic":"Դասական"
            },
            "ru": {
                "homeheader":"ГЛАВНАЯ",
                "profile":"ПРОФИЛЬ",
                "setting": "НАСТРОЙКИ",
                "logout":"ВЫЙТИ",
                "header":"История матчей",
                "playerList": "Список игроков",
                "preference": "Предпочтение",
                "points": "Очки",
                "date": "Дата",
                "result": "Результат",
                "won":"Выиграл",
                "lose":"Поражение",
                "arcade":"Аркада",
                "classic":"Классический"
            },
            "cn": {
                "homeheader":"家",
                "profile":"档案",
                "setting": "設定",
                "logout":"登出",
                "header":"比賽歷史",
                "playerList": "球員名單",
                "preference": "偏愛",
                "points": "積分",
                "date": "日期",
                "result": "結果",
                "won":"韓元",
                "lose":"打敗",
                "arcade":"拱廊",
                "classic":"經典的"
            },
    };

    const elementsToTranslate = {
        'homeheader': 'homeheader',
        'profile': 'profile',
        'setting': 'setting',
        'logout': 'logout',
        'header': 'header',
        'playerList': 'playerList',
        'preference': 'preference',
        'points': 'points',
        'date': 'date',
        'result': 'result',
        'arcade': 'arcade',
        'classic': 'classic'
    };

    Object.keys(elementsToTranslate).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = translations[selectedLanguage][elementsToTranslate[id]];
        }
    });

    var won = document.getElementsByClassName('result-won');
    for (var i = 0; i < won.length; i++) {
        won[i].innerText = translations[selectedLanguage].won;
    }
    var lose = document.getElementsByClassName('result-lose');
    for (var i = 0; i < lose.length; i++) {
        lose[i].innerText = translations[selectedLanguage].lose;
    }
  }

  document.addEventListener('DOMContentLoaded', applyLanguage);
