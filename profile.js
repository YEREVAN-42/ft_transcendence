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

// Event listener for search input
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

const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

function openTab(event, tabName) {
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    event.currentTarget.classList.add('active');

    fetchData(tabName);
}

async function fetchData(tabName) {
    let endpoint = '';
    if (tabName === 'Friends') endpoint = '/friends';
    else if (tabName === 'Requests') endpoint = '/requests';
    else if (tabName === 'Suggestions') endpoint = '/users';

    const tabContent = document.getElementById(tabName);
    tabContent.innerHTML = '<p>Loading...</p>'; // Show loading indicator

    try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        const data = await response.json();

        tabContent.innerHTML = ''; // Clear previous content

        if (tabName === 'Friends') {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'friend';
                div.innerHTML = `
                    <img src="${item.profile_picture}" alt="${item.username}" class="friend-picture">
                    <div class="friend-info">
                        <span class="friend-username">${item.username}</span>
                        <span class="friend-activity">${item.activity_status}</span>
                    </div>
                    <button class="details-button" data-action="details">Remove</button>
                `;
                tabContent.appendChild(div);
            });
        } else if (tabName === 'Requests') {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'friend-request';
                div.innerHTML = `
                    <img src="${item.profile_picture}" alt="${item.username}" class="friend-picture">
                    <div class="friend-info">
                        <span class="friend-username">${item.username}</span>
                        <button class="accept-button" data-action="accept">Accept</button>
                        <button class="decline-button" data-action="decline">Decline</button>
                    </div>
                `;
                tabContent.appendChild(div);
            });
        } else if (tabName === 'Suggestions') {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'friend-suggestion';
                div.innerHTML = `
                    <img src="${item.profile_picture}" alt="${item.username}" class="friend-picture">
                    <div class="friend-info">
                        <span class="friend-username">${item.username}</span>
                        <button class="add-button" data-action="add">Add</button>
                    </div>
                `;
                tabContent.appendChild(div);
            });
        }

        tabContent.classList.add('active'); // Only show content after data is loaded
    } catch (error) {
        tabContent.innerHTML = '<p>Error loading data</p>';
        console.error('Error fetching data:', error);
    }
}



var dataFetched = false; // Boolean variable to check if data is fetched

document.getElementById('friends-tab').addEventListener('click', async function() {
    var friendsTab = document.getElementById('friends-tab');
    var friendsContent = document.getElementById('friends-content');
    var friendsList = document.getElementById('friends-list');

    // Check if data is already fetched
    if (dataFetched) {
        friendsTab.classList.add('active');
        friendsContent.classList.add('active');
        return;
    }

    // Fetch friends data from the server
    try {
        let response = await fetch('http://localhost:3000/api/friends');
        let data = await response.json();

        // Populate the friends list
        friendsList.innerHTML = '';
        data.forEach(friend => {
            let listItem = document.createElement('li');
            listItem.textContent = friend.name; // Adjust according to your data structure
            friendsList.appendChild(listItem);
        });

        // Set dataFetched to true and display the content
        dataFetched = true;
        friendsTab.classList.add('active');
        friendsContent.classList.add('active');
        } 
        catch (error) {
            console.error('Error fetching friends data:', error);
        }
});

// Initially hide all tab contents
tabContents.forEach(content => content.classList.remove('active'));

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