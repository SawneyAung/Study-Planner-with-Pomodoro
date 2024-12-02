// Pomodoro Timer
const circularProgressBar = document.querySelector('#circularProgressBar');
const circularProgressBarNumber = document.querySelector('#timerDisplay');
const buttonTypePomodoro = document.querySelector('#pomodoroBtn');
const buttonTypeShortBreak = document.querySelector('#shortBreakBtn');
const buttonTypeLongBreak = document.querySelector('#longBreakBtn');

const pomodoroTimerInSeconds = 1500; // 25 minutes
const shortBreakTimerInSeconds = 300; // 5 minutes
const longBreakTimerInSeconds = 900; // 15 minutes
const TIMER_TYPE_POMODORO = 'POMODORO';
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';
const TIMER_TYPE_LONG_BREAK = 'LONGBREAK';

let progressInterval = null;
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;
let multiplierFactor = 360 / timerValue;

function formatNumberInStringMinute(number) {
    const minutes = Math.trunc(number / 60).toString().padStart(2, '0');
    const seconds = Math.trunc(number % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

const startTimer = () => {
    // Only start the timer if no interval is running
    if (!progressInterval) {
        progressInterval = setInterval(() => {
            if (timerValue > 0) {
                timerValue--;
                setInfoCircularProgressBar();
            } else {
                stopTimer(); // Stop the timer when it reaches 0
            }
        }, 1000);
    }
};

const stopTimer = () => {
    clearInterval(progressInterval);
    progressInterval = null; // Reset the interval reference
};

const resetTimer = () => {
    stopTimer();
    // Reset the timerValue based on the current type
    timerValue = pomodoroType === TIMER_TYPE_POMODORO
        ? pomodoroTimerInSeconds
        : pomodoroType === TIMER_TYPE_SHORT_BREAK
            ? shortBreakTimerInSeconds
            : longBreakTimerInSeconds;
    setInfoCircularProgressBar();
};

function setInfoCircularProgressBar() {
    // Update the circular progress bar and timer text
    circularProgressBarNumber.textContent = formatNumberInStringMinute(timerValue);
    const progressValue = (timerValue / (pomodoroType === TIMER_TYPE_POMODORO
        ? pomodoroTimerInSeconds
        : pomodoroType === TIMER_TYPE_SHORT_BREAK
            ? shortBreakTimerInSeconds
            : longBreakTimerInSeconds)) * 360;

    circularProgressBar.style.background = `conic-gradient(var(--red) ${progressValue}deg, var(--primary) 0deg)`;
}

const setPomodoroType = (type) => {
    pomodoroType = type;

    // Remove active class from all buttons first
    buttonTypePomodoro.classList.remove("active");
    buttonTypeShortBreak.classList.remove("active");
    buttonTypeLongBreak.classList.remove("active");

    // Add the active class to the clicked button
    if (type === TIMER_TYPE_POMODORO) {
        buttonTypePomodoro.classList.add("active");
    } else if (type === TIMER_TYPE_SHORT_BREAK) {
        buttonTypeShortBreak.classList.add("active");
    } else if (type === TIMER_TYPE_LONG_BREAK) {
        buttonTypeLongBreak.classList.add("active");
    }

    resetTimer(); // Reset the timer when switching types
};

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
