// Get references to DOM elements
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const netBalance = document.getElementById('net-balance');
const dateInput = document.getElementById('date');

// Load transactions from localStorage or start empty
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

dateInput.valueAsDate = new Date();

// Initialize app
renderTransactions();
updateTotals();

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const type = typeInput.value;
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const date = dateInput.value;

    if (!description || isNaN(amount)) {
        alert('Please enter valid description and amount');
        return;
    }

    const transaction = { type, description, amount, date };
    transactions.push(transaction);

    saveTransactions(); // Save to localStorage
    renderTransactions();
    updateTotals();

    // Clear form inputs
    descriptionInput.value = '';
    amountInput.value = '';
});

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Function to render all transactions
function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionToList);
}

// Function to add a transaction to the list in the UI
function addTransactionToList(transaction, index) {
    const listItem = document.createElement('li');
    listItem.classList.add(transaction.type);

    listItem.innerHTML = `
    ${transaction.description} 
    <span>${formatCurrency(transaction.amount)}</span>
    <small>🗓️ ${transaction.date}</small>
    <button class="delete-btn" data-index="${index}">❌</button>
`;

    transactionList.appendChild(listItem);

    // Delete button event
    listItem.querySelector('.delete-btn').addEventListener('click', function () {
        deleteTransaction(index);
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return 'R' + amount.toFixed(2);
}

// Update totals in the UI
function updateTotals() {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            income += transaction.amount;
        } else if (transaction.type === 'expense') {
            expenses += transaction.amount;
        }
    });

    const net = income - expenses;

    totalIncome.textContent = formatCurrency(income);
    totalExpenses.textContent = formatCurrency(expenses);
    netBalance.textContent = formatCurrency(net);
}

// Delete transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions(); // ✅ Save changes
    renderTransactions();
    updateTotals();
}

// Clear all transactions
const clearButton = document.getElementById('clear-all');
clearButton.addEventListener('click', function () {
    if (confirm('Are you sure you want to clear all transactions?')) {
        transactions = [];
        saveTransactions();
        renderTransactions();
        updateTotals();
    }
});