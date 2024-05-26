document.getElementById("for42Submit").addEventListener("submit", function(event) {
    if (!validateForm()) {
      event.preventDefault(); // Prevent the form from submitting
      alert("Please, fill the field !"); // Show an alert message
    }
    else {
      event.preventDefault(); // Prevent the form from submitting
      window.location.href = "./home.html"; // Redirect to page2.html
    }
});
  
function validateForm() {
    var input1 = document.getElementById("username").value;
    return input1 !== "";
}