 // JavaScript for the profile menu
 document.addEventListener("DOMContentLoaded", function() {
    var profileImage = document.getElementById("profileImage");
    var menu = document.getElementById("menu");

    const url_code = window.location.search?.slice(6)
    if (!url_code)
    {
        alert('No code found. Please log in.');
        window.location.href = '/';
        return;
    }
    const username = localStorage.getItem('username');

    requestData = {
        "code": url_code,
        "username": username
    }

    const url = `http://10.12.17.4:8000/api/v1/login/`
    fetch(url, {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response =>
    {
        if (!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error =>
    {
        alert("Invalid username");
        console.error('There has been a problem with your fetch operation:', error);
        window.location.href = '/';
    });
    
    
    
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

//   var profilePic = localStorage.getItem('profilePic');
//   document.getElementById('profileImage').src = profilePic || 'profile.jpg';