/**
 * Adds a single row to the table
 * @param {string} tableId - ID of the table to add the row to
 * @param {number} index - Index of the row to add
 * @param {Array} data - Array of data to add to the row
 */
function addRow(tableId, index, data) {
    // Creating rows with DOM instead of using string manipulation from previous levels

    const [FEATURES, BASIC, PRO] = data;
    
    // Create row and cells using DOM
    const row = document.createElement('tr');
    
    // Create and add feature cell
    const featureCell = document.createElement('td');
    featureCell.textContent = FEATURES[index];
    // Adding this feature cell to row
    row.appendChild(featureCell);
    
    // Create and add Basic cell with icon
    const basicCell = document.createElement('td');
    const basicIcon = document.createElement('i');
    // Mini template string for proper class name format
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    basicIcon.className = `fa ${BASIC[index]}`;
    basicCell.appendChild(basicIcon);
    row.appendChild(basicCell);
    
    // Create and add Pro cell with icon
    const proCell = document.createElement('td');
    const proIcon = document.createElement('i');
    proIcon.className = `fa ${PRO[index]}`;
    proCell.appendChild(proIcon);
    row.appendChild(proCell);
    
    // Add row to table
    document.getElementById(tableId).appendChild(row);
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