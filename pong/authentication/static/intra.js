let INTRA_API_URL="https://api.intra.42.fr/";
let INTRA_API_UID="u-s4t2ud-a4cef84ce67cf9eda49db243b87fd07928bd32e8fc800c0e10efa99e70068f14";
let INTRA_REDIRECT_URI="http://10.12.17.4:8000/home/";

document.getElementById("for42Submit").addEventListener("submit", function(event) {
    if (!validateForm()) {
      event.preventDefault(); // Prevent the form from submitting
      alert("Please, fill the field !"); // Show an alert message
    }
    else {
      event.preventDefault(); // Prevent the form from submitting
      const username = document.getElementById("username").value;
      localStorage.setItem('username', username);
      window.location.href = `${INTRA_API_URL}/oauth/authorize?client_id=${INTRA_API_UID}&redirect_uri=${INTRA_REDIRECT_URI}&response_type=code`
    }

    
});
  
function validateForm() {
    var input1 = document.getElementById("username").value;
    return input1 !== "";
}

