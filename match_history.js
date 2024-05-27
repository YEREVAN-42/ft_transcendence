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
        const playerName = document.createTextNode(' ' + match.username); // Add a space between the image and name
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