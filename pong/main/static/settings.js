// For the profile menu
document.addEventListener("DOMContentLoaded", function()
{
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
    
// var profilePic = localStorage.getItem('profilePic');
// document.getElementById('profileImage').src = profilePic || 'profile.jpg';
// var profilePicLarge = localStorage.getItem('profilePicLarge');
// document.getElementById('profileImageLarge').src = profilePic || 'profile.jpg';
      
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

var defaultProfilePic = './images/default_user.jpg'; // Define the default profile picture path

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

    fetch('http://localhost:8000/settings/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
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
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    alert('Changes saved successfully!');
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

document.getElementById('guest').textContent = profileName;

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

// Delete account
document.getElementById('deleteAccountBtn').addEventListener('click', function(e) {
    e.preventDefault();
    var requestData = {
        id: 10,
    };

    var question = confirm('Are you sure you want to delete your account?');
    if (!question) {
        return;
    }
    fetch('http://localhost:8000/delete_account/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (response.status === 200)
        {            
            alert('Account deleted successfully!');
            //clear routing history
            window.history.pushState({}, "", '/');
            localStorage.clear();
            window.location.href = 'http://localhost:8000/';
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