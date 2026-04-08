// script.js

// Refactored JavaScript code for football tracker

// Improved table generation function
function generateTable(data) {
    const table = document.createElement('table');
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headers = Object.keys(data[0]);
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    const body = table.createTBody();
    data.forEach(item => {
        const row = body.insertRow();
        headers.forEach(headerText => {
            const cell = row.insertCell();
            cell.textContent = item[headerText];
        });
    });
    return table;
}

// Data management functions
let data = [];

function addData(item) {
    data.push(item);
    updateTable();
}

function updateTable() {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    const table = generateTable(data);
    tableContainer.appendChild(table);
}

// Utility functions
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}

function initialize() {
    fetchData('api/endpoint')
        .then(fetchedData => {
            data = fetchedData;
            updateTable();
        });
}

// Call initialize to set up the application
initialize();