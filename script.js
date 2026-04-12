// Select elements
const dueDate = new Date("2026-02-18T14:00:00");
const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
const checkbox = document.getElementById("complete-checkbox");
const title = document.querySelector('[data-testid="test-todo-title"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');


// Time Remaining Function

function updateTimeRemaining() {
  const now = new Date();
  const diff = dueDate - now;

  if (diff <= 0) {
    const overdueHours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));

    if (overdueHours < 1) {
      timeRemainingEl.textContent = "Due now!";
    } else {
      timeRemainingEl.textContent = `Overdue by ${overdueHours} hour(s)`;
    }
    return;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    timeRemainingEl.textContent = `Due in ${days} day(s)`;
  } else if (hours > 0) {
    timeRemainingEl.textContent = `Due in ${hours} hour(s)`;
  } else if (minutes > 0) {
    timeRemainingEl.textContent = `Due in ${minutes} minute(s)`;
  } else {
    timeRemainingEl.textContent = "Due now!";
  }
}

// Run once immediately
updateTimeRemaining();

// Optional: update every 60 seconds
setInterval(updateTimeRemaining, 60000);


// Checkbox Toggle Logic

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    title.style.textDecoration = "line-through";
    status.textContent = "Done";
  } else {
    title.style.textDecoration = "none";
    status.textContent = "In Progress";
  }
});


// Button Actions

editBtn.addEventListener("click", () => {
  console.log("Edit clicked");
});

deleteBtn.addEventListener("click", () => {
  alert("Delete clicked");
});