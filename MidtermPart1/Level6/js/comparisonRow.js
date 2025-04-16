// Template for table rows (CHECKCROSSBASIC and CHECKCROSSPRO get replaced)
const ROW = '<tr><td>Sample text</td><td><i class="fa CHECKCROSSBASIC"></i></td><td><i class="fa CHECKCROSSPRO"></i></td></tr>';
 
// Add one row with check/cross icons based on true/false parameters
function addRow(basicOption, proOption, tableId) {
    const basicClass = basicOption ? 'fa-check' : 'fa-remove';
    const proClass = proOption ? 'fa-check' : 'fa-remove';
    
    const newRow = ROW
        .replace('CHECKCROSSBASIC', basicClass)
        .replace('CHECKCROSSPRO', proClass);
    
    document.getElementById(tableId).innerHTML += newRow;
}

// Add NRROWS identical rows to the table
// Number of rows is not globally defined here, it is defined in the html file
// so the JS file is just like a library that can be used independently
function addMultipleRows(tableId, numRows) {
    for (let i = 0; i < numRows; i++) {
        addRow(true, true, tableId);
    }
}