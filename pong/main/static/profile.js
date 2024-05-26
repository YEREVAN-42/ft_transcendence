// JavaScript for the profile menu
document.addEventListener("DOMContentLoaded", function()
{
  var profileImage = document.getElementById("profileImage");
  var menu = document.getElementById("menu");

  profileImage.addEventListener("click", function()
  {
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

var profilePicLarge = localStorage.getItem('profilePicLarge');
document.getElementById('profileImageLarge').src = profilePic || 'static/images/guest.png';

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

function openTab(evt, tabName)
{

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

  // localStorage.setItem('activeTab', tabName);

  if (tabName === 'Friends') {
    friends_list();
  }
  else if (tabName === 'Requests') {
    requests_list();
  }
  else if (tabName === 'Users') {
    users_list();
  }
}

function friends_list()
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

  const url = `http://10.12.17.4:8000/api/v1/friends/${userId}/`;

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
  //     let friends = document.getElementById('friends');
  //     friends.innerHTML = '';
  //     data.forEach(friend => {
  //         let friendElement = document.createElement('div');
  //         friendElement.className = 'friend';
  //         friendElement.innerHTML = `
  //             <img src="${friend.profile_pic}" alt="Profile Picture" class="friend-profile-pic">
  //             <div class="friend-username">${friend.username}</div>
  //             <div class="friend-buttons">
  //                 <button class="friend-button" onclick="remove_friend()">Remove</button>
  //             </div>
  //         `;
  //         friends.appendChild(friendElement);
  //     });
  // })
  // .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    // });
}

function requests_list()
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

const url = `http://10.12.17.4:8000/api/v1/requests/${userId}/`;

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
//     let friends = document.getElementById('friends');
//     friends.innerHTML = '';
//     data.forEach(friend => {
//         let friendElement = document.createElement('div');
//         friendElement.className = 'friend';
//         friendElement.innerHTML = `
//             <img src="${friend.profile_pic}" alt="Profile Picture" class="friend-profile-pic">
//             <div class="friend-username">${friend.username}</div>
//             <div class="friend-buttons">
//                 <button class="friend-button" onclick="remove_friend()">Remove</button>
//             </div>
//         `;
//         friends.appendChild(friendElement);
//     });
// })
// .catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  // });
  
}

function users_list()
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
  
  const url = `http://10.12.17.4:8000/api/v1/users_list/${userId}/`;
  
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
    console.log(data);
    document.getElementById("suggestion1").textContent = data[0].username;
    document.getElementById("suggestion2").textContent = data[1].username;
    // window.location.href = `http://10.12.17.4:8000/users/`;
  
  })
  // .then(data => {
    //     console.log(data);
    //     let friends = document.getElementById('friends');
    //     friends.innerHTML = '';
    //     data.forEach(friend => {
      //         let friendElement = document.createElement('div');
      //         friendElement.className = 'friend';
      //         friendElement.innerHTML = `
      //             <img src="${friend.profile_pic}" alt="Profile Picture" class="friend-profile-pic">
      //             <div class="friend-username">${friend.username}</div>
      //             <div class="friend-buttons">
      //                 <button class="friend-button" onclick="remove_friend()">Remove</button>
      //             </div>
      //         `;
      //         friends.appendChild(friendElement);
      //     });
      // })
      // .catch(error => {
        //     console.error('There was a problem with the fetch operation:', error);
        // });
      }
      
// document.addEventListener('DOMContentLoaded', (event) => {
//   const activeTab = localStorage.getItem('activeTab'); // Default to 'Friends' if no tab is saved
//   document.querySelector(`.tab-button[onclick="openTab(event, '${activeTab}')"]`).click();
// });

// Set default tab to be opened
// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelector('.tab-button').click();
// });

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

const url = `http://10.12.17.4:8000/api/v1/match_history/${userId}/`;

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

const url = `http://10.12.17.4:8000/api/v1/tournaments/${userId}/`;

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

const url = `http://10.12.17.4:8000/home/${userId}/`;

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

//friends zone

function add_friend()
{
  const request_data = {
      "receiver_id": 2
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
  const url = `http://10.12.17.4:8000/api/v1/add_friend/${userId}/`;
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(request_data)
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
}

function accept_request()
{
  const request_data = {
      "sender_id": 1
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
  const url = `http://10.12.17.4:8000/api/v1/accept/${userId}/`;
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(request_data)
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

}

function decline_request()
{
  const request_data = {
      "sender_id": 1
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
  const url = `http://10.12.17.4:8000/api/v1/decline/${userId}/`;
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(request_data)
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
}

function remove_friend()
{
  const request_data = {
      "receiver_id": 2
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
  const url = `http://10.12.17.4:8000/api/v1/remove/${userId}/`;
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(request_data)
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

function applyLanguage() {
  var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  const translations = {
          "en": {
              "homeheader":"HOME",
              "profile":"PROFILE",
              "settingsId": "SETTINGS",
              "logoutId":"LOG OUT",
              "prof":"Profile",
              "guest": "Username",
              "listHeader":"Friends List",
              "searchInput":"Search friends...",
              "friends":"Friends",
              "request": "Requests",
              "users":"Users",
              "removeButton":"Remove",
              "accept":"Accept",
              "decline":"Decline",
              "add":"Add",
              "matchHistory":"Match history",
              "turm":"Tournaments"
          },
          "hy": {
              "homeheader":"ԳԼԽԱՎՈՐ",
              "profile":"ՊՐՈՖԻԼ",
              "settingsId": "ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ",
              "logoutId":"ԴՈՒՐՍ ԳԱԼ",
              "prof":"Անձնական էջ",
              "guest": "Օգտանունը",
              "listHeader":"Ընկերների ցանկ",
              "searchInput":"Փնտրել ընկերներին...",
              "friends":"Ընկերներ",
              "request": "Հարցումներ",
              "users":"Օգտատերեր",
              "removeButton":"Հեռացնել",
              "accept":"Ընդունել",
              "decline":"Մերժել",
              "add":"Ավելացնել",
              "matchHistory":"Խաղի պատմություն",
              "turm":"Մրցաշարեր"
          },
          "ru": {
              "homeheader":"ГЛАВНАЯ",
              "profile":"ПРОФИЛЬ",
              "settingsId": "НАСТРОЙКИ",
              "logoutId":"ВЫЙТИ",
              "prof":"Профиль",
              "guest": "Имя пользователя",
              "listHeader":"Список друзей",
              "searchInput":"Поиск друзей...",
              "friends":"Друзья",
              "request": "Запросы",
              "users":"Пользователи",
              "removeButton":"Удалять",
              "accept":"Принимать",
              "decline":"Отклонить",
              "add":"Добавлять",
              "matchHistory":"История матчей",
              "turm":"Турниры"
          },
          "cn": {
              "homeheader":"家",
              "profile":"档案",
              "settingsId": "設定",
              "logoutId":"登出",
              "prof":"輪廓",
              "guest": "使用者名稱",
              "listHeader":"好友列表",
              "searchInput":"搜尋好友...",
              "friends":"朋友們",
              "request": "要求",
              "users":"使用者",
              "removeButton":"消除",
              "accept":"接受",
              "decline":"衰退",
              "add":"添加",
              "matchHistory":"比賽歷史",
              "turm":"錦標賽"
          },
  };
  const elementsToTranslate = {
      'homeheader': 'homeheader',
      'profile': 'profile',
      'settingsId': 'settingsId',
      'logoutId': 'logoutId',
      'prof': 'prof',
      'guest': 'guest',
      'listHeader': 'listHeader',
      'friends': 'friends',
      'request': 'request',
      'matchHistory': 'matchHistory',
      'users':'users',
      'turm': 'turm'
  };
  
  Object.keys(elementsToTranslate).forEach(function(id) {
      var element = document.getElementById(id);
      if (element) {
          var translationKey = elementsToTranslate[id];
          element.textContent = translations[selectedLanguage][translationKey];
      }
  });
  document.getElementById('searchInput').placeholder = translations[selectedLanguage].searchInput;

  var detailsButtons = document.getElementsByClassName('details-button');
  for (var i = 0; i < detailsButtons.length; i++) {
      detailsButtons[i].innerText = translations[selectedLanguage].removeButton;
  }
  var declineButtons = document.getElementsByClassName('decline-button');
  var acceptButtons = document.getElementsByClassName('accept-button');
  for (var i = 0; i < declineButtons.length; i++) {
      declineButtons[i].innerText = translations[selectedLanguage].decline;
      acceptButtons[i].innerText = translations[selectedLanguage].accept;
  }
  var addButtons = document.getElementsByClassName('add-button');
  for (var i = 0; i < addButtons.length; i++) {
      addButtons[i].innerText = translations[selectedLanguage].add;
  }
}

document.addEventListener('DOMContentLoaded', applyLanguage);