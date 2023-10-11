/*
This is the JavaScript file for the pink themed website.
*/
// Add event listener to the portfolio button
const portfolioButton = document.querySelector('.portfolio-button');
portfolioButton.addEventListener('click', openPortfolio);
// Function to open the portfolio page
function openPortfolio() {
    window.open('portfolio.html', '_blank');
}