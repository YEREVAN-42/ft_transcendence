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
    if (tabName === 'Users') endpoint = '/users';
    else if (tabName === 'Requests') endpoint = '/requests';
    // else if (tabName === 'Tournament') endpoint = '/tournament';

    const tabContent = document.getElementById(tabName);
    tabContent.innerHTML = '<p>Loading...</p>'; // Show loading indicator

    try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        const data = await response.json();

        tabContent.innerHTML = ''; // Clear previous content

        if (tabName === 'Users') {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'friend';
                div.innerHTML = `
                    <img src="${item.profile_picture}" alt="${item.username}" class="friend-picture">
                    <div class="friend-info">
                        <span class="friend-username">${item.username}</span>
                        <span class="friend-points">${item.points_status}</span>
                    </div>
                    <button class="invite-button" data-action="details">Invite</button>
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
                        <button class="accept-button" data-action="accept">Join</button>
                        <button class="decline-button" data-action="decline">Ignore</button>
                    </div>
                `;
                tabContent.appendChild(div);
            });
        } //else if (tabName === 'Tournament') {
        //     data.forEach(item => {
        //         const div = document.createElement('div');
        //         div.className = 'tournament-join';
        //         div.innerHTML = `
        //         <button class="join-tournament-button" onclick="showJoinForm()">Join Tournament</button>
        //         <div class="tournament-users">
        //             <h2>Joined Users:</h2>
        //             <div id="tournamentUserList">
        //             </div>
        //         </div>
        //     <button class="start-tournament-button" id="newTournamentButton" style="display: none;" onclick="startNewTournament()">Start New Tournament</button>
        //     <!-- for username and password addition in tournaments -->
        //     <div id="joinFormModal" class="modal">
        //         <div class="modal-content">
        //             <span class="close" onclick="closeModal()">&times;</span>
        //             <h2>Join Tournament</h2>
        //             <input type="text" id="usernameInput" placeholder="Username" required>
        //             <input type="password" id="passwordInput" placeholder="Password" required>
        //             <button onclick="joinTournament()" class="submit-info">Submit</button>
        //         </div>
        //     </div>
        //         `;
        //         tabContent.appendChild(div);
        //     });
        // }
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
    var friendsList = document.getElementById('users-list');

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

function showJoinForm() {
document.getElementById('joinFormModal').style.display = 'block';
}

function closeModal() {
document.getElementById('joinFormModal').style.display = 'none';
}

var joinedUsers = 0;

function joinTournament() {
var usernameInput = document.getElementById('usernameInput').value;
var passwordInput = document.getElementById('passwordInput').value;
if (usernameInput && passwordInput) {
    if (joinedUsers < 4) {
        var userList = document.getElementById("tournamentUserList");
        var user = document.createElement("div");
        user.className = "tournament-user";
        user.innerHTML = `
            <img src="./public/guest.png" alt="User">
            <span>${usernameInput}</span>
        `;
        userList.appendChild(user);
        joinedUsers++;

        if (joinedUsers === 4) {
            var newTournamentButton = document.getElementById("newTournamentButton");
            newTournamentButton.style.display = "block";
        }

        // Clear the input fields after submission
        document.getElementById('usernameInput').value = '';
        document.getElementById('passwordInput').value = '';

        // Close the modal after submission
        closeModal();
    }
} 
    else {
        alert("Please fill in both fields.");
    }
}

function startNewTournament() {
// Your logic for starting a new tournament
alert("Starting a new tournament!");
// Reset the tournament for new users
var userList = document.getElementById("tournamentUserList");
userList.innerHTML = '';
joinedUsers = 0;
document.getElementById("newTournamentButton").style.display = "none";
}

// Initially hide all tab contents
tabContents.forEach(content => content.classList.remove('active'));

// Set default tab to be opened
document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.tab-button').click();
});