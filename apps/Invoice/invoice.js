const addItemBtn = document.getElementById("add-item");
const itemBody = document.getElementById("items-body");
const grandTotal = document.getElementById("grand-total");

// Add first empty row on load
addItemRow();

addItemBtn.addEventListener("click", addItemRow);

function addItemRow() {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td><input type="text" class="desc" placeholder="Item description" /></td>
    <td><input type="number" class="qty" value="1" min="1" /></td>
    <td><input type="number" class="price" value="0.00" step="0.01" /></td>
    <td class="item-total">0.00</td>
    <td><button class="remove-btn">✖</button></td>
  `;

    itemBody.appendChild(row)

    row.querySelector(".qty").addEventListener("input", updateTotals);
    row.querySelector(".price").addEventListener("input", updateTotals);
    row.querySelector(".remove-btn").addEventListener("click", () => {
        row.remove();
        updateTotals();
    });

    updateTotals();


}

function updateTotals() {
    let total = 0;

    document.querySelectorAll("#items-body tr").forEach(row => {
        const qty = parseFloat(row.querySelector(".qty").value) || 0;
        const price = parseFloat(row.querySelector(".price").value) || 0;
        const itemTotal = qty * price;
        row.querySelector(".item-total").textContent = itemTotal.toFixed(2);
        total += itemTotal;
    });

    grandTotal.textContent = total.toFixed(2);
}

// Optional: Generate invoice (for printing or PDF later)
document.getElementById("generate-btn").addEventListener("click", () => {
    window.print(); // Simplest way to allow user to print or export as PDF
});