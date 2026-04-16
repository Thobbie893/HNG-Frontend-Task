// Define initial state
const state = {
  title: "Do your homework",
  description: "Answer the questions on grammatical names and functions in English...",
  priority: "High",
  status: "In Progress",
  dueDate: new Date("2026-02-18T14:00:00"),
  isExpanded: false
};

// Get all elements using data-testid
const elements = {
  checkbox: document.querySelector('#complete-checkbox'),
  titleEl: document.querySelector('[data-testid="test-todo-title"]'),
  statusEl: document.querySelector('[data-testid="test-todo-status"]'),
  descEl: document.querySelector('[data-testid="test-todo-collapsible-description"]'),
  expandBtn: document.querySelector('[data-testid="test-todo-expand-toggle"]'),
  priorityEl: document.querySelector('[data-testid="test-todo-priority"]'),
  timeRemainingEl: document.querySelector('[data-testid="test-todo-time-remaining"]'),
  editBtn: document.querySelector('[data-testid="test-todo-edit-button"]'),
  editForm: document.querySelector('[data-testid="test-todo-edit-form"]'),
  editTitle: document.querySelector('[data-testid="test-todo-edit-title-input"]'),
  editDesc: document.querySelector('[data-testid="test-todo-edit-description-input"]'),
  editPriority: document.querySelector('[data-testid="test-todo-edit-priority-select"]').nextElementSibling, // select after label
  editDate: document.querySelector('[data-testid="test-todo-edit-due-date"]'),
  saveBtn: document.querySelector('[data-testid="test-todo-save-button"]'),
  cancelBtn: document.querySelector('[data-testid="test-todo-cancel-button"]')
};

// Save original state for cancel
let originalState = { ...state };

// Edit toggle
elements.editBtn.onclick = () => {
  originalState = { ...state };
  elements.editForm.style.display = 'block';
  elements.editTitle.focus();
};

// Save
elements.saveBtn.onclick = (e) => {
  e.preventDefault();
  state.title = elements.editTitle.value || state.title;
  state.description = elements.editDesc.value || state.description;
  state.priority = elements.editPriority.value || state.priority;
  state.dueDate = new Date(elements.editDate.value) || state.dueDate;
  elements.editForm.style.display = 'none';
  updateUI();
};

// Cancel
elements.cancelBtn.onclick = () => {
  Object.assign(state, originalState);
  elements.editForm.style.display = 'none';
  updateUI();
};

// Status sync
elements.checkbox.onchange = () => {
  state.status = elements.checkbox.checked ? "Done" : "Pending";
  updateUI();
};

// Update everything
function updateUI() {
  // Title
  elements.titleEl.textContent = state.title;
  
  // Status
  elements.statusEl.innerHTML = `
    <span class="priority-${state.priority.toLowerCase()}" data-testid="test-todo-priority">${state.priority}</span>
    <p class="${state.status.toLowerCase()}-status" data-testid="test-todo-status">${state.status}</p>
  `;
  
  // Checkbox sync
  elements.checkbox.checked = state.status === "Done";
  
  // Priority visual
  // CSS classes handle this
  
  // Done styling
  document.querySelector('.todo-card').classList.toggle('done', state.status === "Done");
}

// Time update (simplified)
function updateTime() {
  if (state.status === "Done") {
    elements.timeRemainingEl.textContent = "Completed";
    return;
  }
  
  const now = new Date();
  const diff = state.dueDate - now;
  
  if (diff < 0) {
    elements.timeRemainingEl.textContent = "Overdue";
    elements.timeRemainingEl.style.color = "red";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    elements.timeRemainingEl.textContent = `Due in ${days}d ${hours}h`;
    elements.timeRemainingEl.style.color = "";
  }
}

// Init
updateUI();
updateTime();
setInterval(updateTime, 30000); // 30 seconds