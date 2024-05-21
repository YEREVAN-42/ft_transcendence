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
