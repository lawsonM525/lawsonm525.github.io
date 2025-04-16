// js for modal login form

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
