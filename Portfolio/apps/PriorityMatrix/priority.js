function addTask() {
  const taskText = document.getElementById('taskText').value;
  const quadrant = document.getElementById('quadrantSelect').value;
  const deadline = document.getElementById('taskDeadline').value;

  if (!taskText.trim()) return;

  const task = {
    text: taskText,
    quadrant,
    deadline,
    completed: false
  };

  saveTask(task);
  renderTask(task);

  document.getElementById('taskText').value = '';
  document.getElementById('taskDeadline').value = '';
}

function renderTask(task) {
  const taskEl = document.createElement('div');
  taskEl.className = 'task';

  if (task.completed) taskEl.classList.add('completed');

  const textSpan = document.createElement('span');
  textSpan.textContent = task.text;
  taskEl.appendChild(textSpan);

  if (task.deadline) {
    const deadlineSpan = document.createElement('span');
    deadlineSpan.className = 'deadline';
    deadlineSpan.textContent = `Due: ${task.deadline}`;
    taskEl.appendChild(deadlineSpan);
  }

  const actions = document.createElement('div');
  actions.className = 'actions';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.onclick = () => {
    taskEl.classList.toggle('completed');
    task.completed = !task.completed;
    updateTasksStorage();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.onclick = () => {
    taskEl.remove();
    removeTask(task);
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  taskEl.appendChild(actions);

  const quadrantEl = document.querySelector(`.${task.quadrant}`);
  quadrantEl.appendChild(taskEl);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks = tasks.filter(task => !(task.text === taskToRemove.text && task.quadrant === taskToRemove.quadrant && task.deadline === taskToRemove.deadline));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTasksStorage() {
  const tasks = [];
  document.querySelectorAll('.quadrant').forEach((quadrantEl, idx) => {
    const quadrantKey = quadrantEl.classList[1];
    quadrantEl.querySelectorAll('.task').forEach(taskEl => {
      const text = taskEl.querySelector('span').textContent;
      const deadlineSpan = taskEl.querySelector('.deadline');
      const deadline = deadlineSpan ? deadlineSpan.textContent.replace('Due: ', '') : '';
      const completed = taskEl.classList.contains('completed');
      tasks.push({ text, quadrant: quadrantKey, deadline, completed });
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach(renderTask);
}

window.onload = loadTasks;
