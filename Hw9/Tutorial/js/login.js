// JavaScript for the Modal Login Form

// Get the modal element
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to show the modal
function showLoginModal() {
  document.getElementById('id01').style.display = 'block';
}
