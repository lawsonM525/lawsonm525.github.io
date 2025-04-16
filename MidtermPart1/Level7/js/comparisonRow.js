// Template for table rows
const ROW = '<tr><td>TEXT</td><td><i class="fa BASIC"></i></td><td><i class="fa PRO"></i></td></tr>';

// Add one row using values from the arrays at the specified index
// data is an array: [FEATURES, BASIC, PRO]
function addRow(tableId, index, data) {
    const [FEATURES, BASIC, PRO] = data;
    const newRow = ROW
        .replace('TEXT', FEATURES[index])
        .replace('BASIC', BASIC[index])
        .replace('PRO', PRO[index]);
    
    document.getElementById(tableId).innerHTML += newRow;
}

// Add rows using the data from the arrays
function addMultipleRows(tableId, numRows, data) {
    const [FEATURES, BASIC, PRO] = data;
    // Make sure we don't try to add more rows than we have data for
    const actualRows = Math.min(numRows, FEATURES.length);
    
    for (let i = 0; i < actualRows; i++) {
        addRow(tableId, i, data);
    }
}