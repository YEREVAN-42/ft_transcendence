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
document.getElementById('profileImage').src = profilePic || 'static/images/guest.png';

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

    if (tabName === 'Users') {
        gamers();
      }
    else if (tabName === 'Requests') {
        game_requests();
      }
    //   else if (tabName === 'Users') {
    //     ();
    //   }
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

// function goToMatchHistory() {
//     window.location.href = 'match_history.html';
// }

function goTournaments() {
    window.location.href = 'tournaments.html';
}

function extractUserIdFromToken(token) {
    // Decode the JWT token to extract the user ID
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    const decodedToken = JSON.parse(jsonPayload);
    return decodedToken.user_id;
  }

document.getElementById('logoutId').addEventListener('click', function(e)
{
  requested_data = {
    "token": localStorage.getItem('access'),
    "refresh": localStorage.getItem('refresh')
  }
  const token = localStorage.getItem('access');
  if (!token)
  {
    alert('No token found. Please log in.');
    window.location.href = '/';
    return;
  }
  const userId = extractUserIdFromToken(token);
  if (!userId)
  {
    alert('Invalid token. Please log in again.');
    window.location.href = '/';
    return;
  }
  const url = `http://10.12.17.4:8000/api/v1/logout/${userId}/`;
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(requested_data)
    
  })
  .then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
  })
  .then(data => {
    console.log(data);
  })

  localStorage.clear();
  window.history.pushState({}, "", '/');
  window.location.href = '/';
});

//settings page
document.getElementById('settingsId').addEventListener('click', function(e)
{
    e.preventDefault();
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        window.location.href = '/';
        alert('Invalid token. Please log in again.');
        return;
    }

const url = `http://10.12.17.4:8000/api/v1/settings/${userId}/`;
fetch(url, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
  },
})
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
// Assuming your Django view will return a JSON response with user data

console.log(data);
window.location.href = `http://10.12.17.4:8000/settings/`;
})
//   .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     // console.log(data);
//     if (response.status === 200) {
//       console.log("Settings page");
//         // return response.json();
//         // console.log(data.message);
//           window.location.href = url;
//       }
//     return response.json(); // Ensure response is converted to JSON here
// })
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
});

//profile page
document.getElementById('profileId').addEventListener('click', function(e)
{
  e.preventDefault();
  const token = localStorage.getItem('access');
  if (!token)
  {
    alert('No token found. Please log in.');
    window.location.href = '/';
    return;
  }
  const userId = extractUserIdFromToken(token);
  if (!userId)
  {
    alert('Invalid token. Please log in again.');
    window.location.href = '/';
    return;
  }

  const url = `http://10.12.17.4:8000/api/v1/profile/${userId}/`;
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      },
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log(response.status);
    if (response.status === 200) {
          window.location.href = url;
      }
    return response.json();
})
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
});

//home page
document.getElementById('homeId').addEventListener('click', function(e)
{
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        alert('Invalid token. Please log in again.');
        window.location.href = '/';
        return;
}

    const url = `http://10.12.17.4:8000/home/`;

    fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    if (response.status === 200)
    {            
        window.location.href = url;
    }
    return response.json();
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
});

function gamers() {
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        alert('Invalid token. Please log in again.');
        window.location.href = '/';
        return;
    }

    const url = `http://10.12.17.4:8000/api/v1/game_users/${userId}/`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // .then(data => {
    //     console.log(data);
    //     var userList = document.getElementById("friendsList");
    //     userList.innerHTML = '';
    //     for (var i = 0; i < data.length; i++) {
    //         var user = document.createElement("div");
    //         user.className = "friend";
    //         user.innerHTML = `
    //             <img src="./public/guest.png" alt="User">
    //             <span>${data[i].username}</span>
    //         `;
    //         userList.appendChild(user);
    //     }
    // })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function game_requests() {
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        alert('Invalid token. Please log in again.');
        window.location.href = '/';
        return;
    }

    const url = `http://10.12.17.4:8000/api/v1/game_requests/${userId}/`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // .then(data => {
    //     console.log(data);
    //     var userList = document.getElementById("requestsList");
    //     userList.innerHTML = '';
    //     for (var i = 0; i < data.length; i++) {
    //         var user = document.createElement("div");
    //         user.className = "request";
    //         user.innerHTML = `
    //             <img src="./public/guest.png" alt="User">
    //             <span>${data[i].username}</span>
    //         `;
    //         userList.appendChild(user);
    //     }
    // })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function invite_user() {
    requested_data = {
        "receiver_id": 2
    };
        
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        alert('Invalid token. Please log in again.');
        window.location.href = '/';
        return;
    }

    const url = `http://10.12.17.4:8000/api/v1/invite/${userId}/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requested_data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // .then(data => {
    //     console.log(data);
    //     var userList = document.getElementById("requestsList");
    //     userList.innerHTML = '';
    //     for (var i = 0; i < data.length; i++) {
    //         var user = document.createElement("div");
    //         user.className = "request";
    //         user.innerHTML = `
    //             <img src="./public/guest.png" alt="User">
    //             <span>${data[i].username}</span>
    //         `;
    //         userList.appendChild(user);
    //     }
    // })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function join_user() {
    requested_data = {
        "sender_id": 1
    };
        
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        alert('Invalid token. Please log in again.');
        window.location.href = '/';
        return;
    }

    const url = `http://10.12.17.4:8000/api/v1/join/${userId}/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requested_data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // .then(data => {
    //     console.log(data);
    //     var userList = document.getElementById("requestsList");
    //     userList.innerHTML = '';
    //     for (var i = 0; i < data.length; i++) {
    //         var user = document.createElement("div");
    //         user.className = "request";
    //         user.innerHTML = `
    //             <img src="./public/guest.png" alt="User">
    //             <span>${data[i].username}</span>
    //         `;
    //         userList.appendChild(user);
    //     }
    // })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function ignore_user() {
    requested_data = {
        "sender_id": 1
    };
        
    const token = localStorage.getItem('access');
    if (!token)
    {
        alert('No token found. Please log in.');
        window.location.href = '/';
        return;
    }
    const userId = extractUserIdFromToken(token);
    if (!userId)
    {
        alert('Invalid token. Please log in again.');
        window.location.href = '/';
        return;
    }

    const url = `http://10.12.17.4:8000/api/v1/ignore/${userId}/`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requested_data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // .then(data => {
    //     console.log(data);
    //     var userList = document.getElementById("requestsList");
    //     userList.innerHTML = '';
    //     for (var i = 0; i < data.length; i++) {
    //         var user = document.createElement("div");
    //         user.className = "request";
    //         user.innerHTML = `
    //             <img src="./public/guest.png" alt="User">
    //             <span>${data[i].username}</span>
    //         `;
    //         userList.appendChild(user);
    //     }
    // })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


