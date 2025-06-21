const waterInput = document.getElementById("waterInput");
const addBtn = document.getElementById("addBtn");
const logList = document.getElementById("logList");
const progress = document.getElementById("waterProgress");
const progressText = document.getElementById("progressText");
const resetBtn = document.getElementById("resetBtn");
const currentDay = document.getElementById("currentDay");

let totalIntake = 0;
const goal = 3000;
const today = new Date();

// Show full day and date
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
currentDay.textContent = today.toLocaleDateString(undefined, options);

// Load saved data
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("waterData"));
  if (saved && saved.date === today.toDateString()) {
    totalIntake = saved.total;
    logList.innerHTML = saved.logs;
    progress.value = totalIntake;
    progressText.textContent = `${totalIntake} / ${goal} ml`;
    rebindRemoveButtons();
  }
};

// Save to local storage
function saveData() {
  const data = {
    total: totalIntake,
    logs: logList.innerHTML,
    date: today.toDateString()
  };
  localStorage.setItem("waterData", JSON.stringify(data));
}

// Add new intake
addBtn.addEventListener("click", () => {
  const amount = parseInt(waterInput.value);
  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  totalIntake += amount;
  if (totalIntake > goal) totalIntake = goal;

  const li = document.createElement("li");
  li.classList.add("fade-in");
  li.innerHTML = `${amount} ml <button class="removeBtn">✖</button>`;
  logList.appendChild(li);

  progress.value = totalIntake;
  progressText.textContent = `${totalIntake} / ${goal} ml`;

  waterInput.value = "";
  saveData();
  rebindRemoveButtons();
});

// Remove functionality
function rebindRemoveButtons() {
  document.querySelectorAll(".removeBtn").forEach(button => {
    button.onclick = function () {
      const amount = parseInt(this.parentElement.textContent);
      if (!isNaN(amount)) {
        totalIntake -= amount;
        if (totalIntake < 0) totalIntake = 0;
      }
      this.parentElement.remove();
      progress.value = totalIntake;
      progressText.textContent = `${totalIntake} / ${goal} ml`;
      saveData();
    };
  });
}

// Reset day
resetBtn.addEventListener("click", () => {
  if (confirm("Reset today's intake?")) {
    totalIntake = 0;
    logList.innerHTML = "";
    progress.value = 0;
    progressText.textContent = `0 / ${goal} ml`;
    localStorage.removeItem("waterData");
  }
});

// Notifications
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

setInterval(() => {
  if (Notification.permission === "granted") {
    new Notification("💧 Time to drink water!", {
      body: "Stay hydrated and log your intake!",
    });
  }
}, 60 * 60 * 1000); // Every hour