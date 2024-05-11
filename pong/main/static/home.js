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

//   var profilePic = localStorage.getItem('profilePic');
//   document.getElementById('profileImage').src = profilePic || 'profile.jpg';