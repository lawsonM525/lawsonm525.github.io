// Template for table rows
const ROW = '<tr><td>TEXT</td><td><i class="fa BASIC"></i></td><td><i class="fa PRO"></i></td></tr>';

/**
 * Adds a single row to the table
 * @param {string} tableId - ID of the table to add the row to
 * @param {number} index - Index of the row to add
 * @param {Array} data - Array of data to add to the row
 */
function addRow(tableId, index, data) {
    const [FEATURES, BASIC, PRO] = data;
    const newRow = ROW
        .replace('TEXT', FEATURES[index])
        .replace('BASIC', BASIC[index])
        .replace('PRO', PRO[index]);
    
    document.getElementById(tableId).innerHTML += newRow;
}

/**
 * Adds multiple rows to the table
 * @param {string} tableId - ID of the table to add the rows to
 * @param {number} numRows - Number of rows to add
 * @param {Array} data - Array of data to add to the rows
 */
function addMultipleRows(tableId, numRows, data) {
    const [FEATURES, BASIC, PRO] = data;

    // Making sure we don't try to add more rows than we have data for
    const actualRows = Math.min(numRows, FEATURES.length);
    
    // Loop using single row function multiple times
    for (let i = 0; i < actualRows; i++) {
        addRow(tableId, i, data);
    }
}