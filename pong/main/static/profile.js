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

    const url = `http://localhost:8000/api/v1/match_history/${userId}/`;

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
        if (response.status === 200)
        {            
            window.location.href = url;
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function goTournaments() {
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

    const url = `http://localhost:8000/api/v1/tournaments/${userId}/`;

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
        if (response.status === 200)
        {            
            window.location.href = url;
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
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

    const url = `http://localhost:8000/api/v1/home/${userId}/`;

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
    alert('Invalid token. Please log in again.');
    window.location.href = '/';
    return;
  }

  const url = `http://localhost:8000/api/v1/settings/${userId}/`;
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
        // return response.json();
        // console.log(data.message);
          window.location.href = url;
      }
    return response.json(); // Ensure response is converted to JSON here
})
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
});

//friends zone

function add_friend()
{
    
}
