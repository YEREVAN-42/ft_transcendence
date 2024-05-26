var defaultProfilePic = '/static/images/guest.png'; // Define the default profile picture path
// For the profile menu
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
document.getElementById('profileImage').src = profilePic || '/static/images/guest.png';
var profilePicLarge = localStorage.getItem('profilePicLarge');
document.getElementById('profileImageLarge').src = profilePic || '/static/images/guest.png';
      
// Update profile picture
var profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('profileImage').src = profilePic;
    }
    var profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
        document.getElementById('profileImageLarge').src = profilePic;
    }

// Edit profile picture
document.getElementById('editProfileBtn').addEventListener('click', function() {
document.getElementById('profilePicInput').click();
});

// Handle profile picture change
document.getElementById('profilePicInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
    localStorage.setItem('profilePic', reader.result);
    document.getElementById('profileImage').src = reader.result;
};
    reader.readAsDataURL(file);
});
    
document.getElementById('profilePicInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
    localStorage.setItem('profilePic', reader.result);
    document.getElementById('profileImageLarge').src = reader.result;
};
    reader.readAsDataURL(file);
});


// Remove profile picture
document.getElementById('removeProfileBtn').addEventListener('click', function() {
    localStorage.setItem('profilePic', defaultProfilePic);
    document.getElementById('profileImage').src = defaultProfilePic; // Set the profile picture to the default image
    document.getElementById('profileImageLarge').src = defaultProfilePic;
    alert('Are you sure you want to remove the profile picture ?');
});
    
    var profileName = localStorage.getItem('profileName');
    var userName = localStorage.getItem('userName');
    var userEmail = localStorage.getItem('userEmail');
    var userPassword = localStorage.getItem('userPassword');
      
// Populate form with existing values
    document.getElementById('profileName1').value = localStorage.getItem('profileName') || '';
    document.getElementById('userName1').value = localStorage.getItem('userName') || '';
    document.getElementById('userEmail1').value = localStorage.getItem('userEmail') || '';
    document.getElementById('userPassword1').value = localStorage.getItem('userPassword') || '';

// Edit username
document.getElementById('editBtn1').addEventListener('click', function() {
    document.getElementById('profileName').style.display = 'none';
    document.getElementById('profileName1').style.display = 'inline-block';
    document.getElementById('profileName1').focus();
});

document.getElementById('editBtn2').addEventListener('click', function() {
    document.getElementById('userName').style.display = 'none';
    document.getElementById('userName1').style.display = 'inline-block';
    document.getElementById('userName1').focus();
});

document.getElementById('editBtn3').addEventListener('click', function() {
    document.getElementById('userEmail').style.display = 'none';
    document.getElementById('userEmail1').style.display = 'inline-block';
    document.getElementById('userEmail1').focus();
});

document.getElementById('editBtn4').addEventListener('click', function() {
    document.getElementById('userPassword').style.display = 'none';
    document.getElementById('userPassword1').style.display = 'inline-block';
    document.getElementById('userPassword1').focus();
});

async function hashPassword(password)
{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Save changes
document.getElementById('saveChangesBtn').addEventListener('click', async function(e) {
    e.preventDefault();
    var profileName = document.getElementById('profileName1').value;
    var userName = document.getElementById('userName1').value;
    var userEmail = document.getElementById('userEmail1').value;
    var userPassword = document.getElementById('userPassword1').value;
    const hashedPassword = await hashPassword(userPassword);
    document.getElementById('userPassword1').value = userPassword;
    
    var requestData = {
        name: profileName,
        username: userName,
        email: userEmail,
        password: hashedPassword,
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

    const url = `http://10.12.17.4:8000/api/v1/settings/${userId}/`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (response.status === 200)
        {
            alert('Changes saved successfully!');
            window.location.href = url;
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

//Listen for Enter key press to save changes
document.getElementById('profileName1').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('saveChangesBtn').click();
    }
});

document.getElementById('userName1').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('saveChangesBtn').click();
    }
});

document.getElementById('userEmail1').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('saveChangesBtn').click();
    }
});

document.getElementById('userPassword1').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('saveChangesBtn').click();
    }
});

function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    var icon = passwordInput.nextElementSibling.querySelector('i');
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = "password";
        icon.className = 'fas fa-eye';
    }
}

document.getElementById('editBtn4').addEventListener('click', function() {
    var passwordContainer = document.getElementById('passwordContainer');
    passwordContainer.style.display = 'inline-block';
          
    var passwordInput = document.getElementById('userPassword1');
    passwordInput.focus();
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

// Delete account
document.getElementById('deleteAccountBtn').addEventListener('click', function(e) {
    e.preventDefault();

    var question = confirm('Are you sure you want to delete your account?');
    if (!question) {
        return;
    }

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

    const url = `http://10.12.17.4:8000/api/v1/settings/${userId}/`;

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
        if (response.status === 200)
        {            
            alert('Account deleted successfully!');
            window.history.pushState({}, "", '/');
            localStorage.clear();
            window.location.href = '/';
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

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

document.getElementById('profileId').addEventListener('click', function(e)
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