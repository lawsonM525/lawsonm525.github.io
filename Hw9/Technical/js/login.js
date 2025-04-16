// JavaScript for the login forms

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

// Simple form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  const username = form.querySelector('input[name="uname"]').value.trim();
  const password = form.querySelector('input[name="psw"]').value.trim();
  
  if (username === '') {
    alert('Please enter a username');
    return false;
  }
  
  if (password === '') {
    alert('Please enter a password');
    return false;
  }
  
  return true;
}
