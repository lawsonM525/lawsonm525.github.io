// Row template with CHECKCROSSBASIC and CHECKCROSSPRO placeholders
const ROW = '<tr><td>Sample text</td><td><i class="fa CHECKCROSSBASIC"></i></td><td><i class="fa CHECKCROSSPRO"></i></td></tr>';
 
// Function to add a row with specified icons (true=check, false=cross) 
function addRow(basicOption, proOption, tableId) {
    // Convert parameters to Font Awesome classes
    const basicClass = basicOption ? 'fa-check' : 'fa-remove';
    const proClass = proOption ? 'fa-check' : 'fa-remove';
    
    // Replace placeholders with actual classes
    const newRow = ROW
        .replace('CHECKCROSSBASIC', basicClass)
        .replace('CHECKCROSSPRO', proClass);
    
    // Add to table
    const table = document.getElementById(tableId);
    table.innerHTML += newRow;
}