// HTML DOM elements
const categoryInput = document.getElementById('category');
const taskInput = document.getElementById('task');
const tasksList = document.getElementById('tasks-list');

// Initialize an object to store tasks by category
const tasksByCategory = {};

// Add a task to the specified category
function addTask() {
    const category = categoryInput.value.trim();
    const task = taskInput.value.trim();

    if (!category || !task) {
        alert("Please enter both category and task.");
        return;
    }

    // Add the task to the appropriate category
    if (!tasksByCategory[category]) {
        tasksByCategory[category] = [];
    }
    tasksByCategory[category].push(task);

    // Clear input fields
    categoryInput.value = '';
    taskInput.value = '';

    // Refresh displayed tasks
    listTasks();
}

// Display all tasks by category
function listTasks() {
    // Clear previous tasks
    tasksList.innerHTML = '';

    // Iterate through tasksByCategory to display tasks
    for (const [category, tasks] of Object.entries(tasksByCategory)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        categoryDiv.appendChild(categoryHeader);

        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeTask(category, index);

            taskDiv.appendChild(taskSpan);
            taskDiv.appendChild(removeButton);
            categoryDiv.appendChild(taskDiv);
        });

        tasksList.appendChild(categoryDiv);
    }
}

// Remove a task from the specified category
function removeTask(category, taskIndex) {
    // Remove the task from the array
    tasksByCategory[category].splice(taskIndex, 1);

    // If the category is empty, delete it
    if (tasksByCategory[category].length === 0) {
        delete tasksByCategory[category];
    }

    // Refresh displayed tasks
    listTasks();
}
