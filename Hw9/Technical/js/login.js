// js for login forms

// grab the modal element
var modal = document.getElementById('id01');

// close modal when clicking outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// show the modal
function showLoginModal() {
  document.getElementById('id01').style.display = 'block';
}

// quick form check
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
