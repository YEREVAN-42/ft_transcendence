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

