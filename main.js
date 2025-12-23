import { fetchTasks } from './api.js';
import { Task, TaskManager } from './taskManager.js';

// dom elements
const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');
const taskListContainer = document.getElementById('taskList');

const taskManager = new TaskManager();

// event listener for loading tasks
loadTasksBtn.addEventListener('click', handleLoadTasks);

async function handleLoadTasks() {
   
    statusMessage.textContent = "Loading tasks...";
    statusMessage.style.color = "#555";
    loadTasksBtn.disabled = true;

    try {
        // 1 fetch raw data asynchronously
        const rawData = await fetchTasks();

        // 22  stringify then parse
        const jsonString = JSON.stringify(rawData);
        const parsedData = JSON.parse(jsonString);

        // 3 convert parsed objects 
        const taskInstances = parsedData.map(data => 
            new Task(data.id, data.title, data.completed)
        );

        // 4 store in Manager
        taskManager.setTasks(taskInstances);

        // 5 render to dom
        renderTasks();
        
        statusMessage.textContent = "Tasks loaded successfully!";
        setTimeout(() => { statusMessage.textContent = ""; }, 2000);

    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Error loading tasks.";
        statusMessage.style.color = "red";
    } finally {
        loadTasksBtn.disabled = false;
    }
}

function renderTasks() {
    // clear existing content
    taskListContainer.innerHTML = '';

    // looop through tasks in the manager
    taskManager.tasks.forEach(task => {
        // createe elements 
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        // toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? "Undo" : "Done";
        toggleBtn.className = 'btn-toggle';
        toggleBtn.addEventListener('click', () => {
            taskManager.toggleTask(task.id);
            renderTasks(); // render again after update
        });

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.className = 'btn-delete';
        deleteBtn.addEventListener('click', () => {
            taskManager.removeTask(task.id);
            renderTasks(); 
        });

        // dom tree
        actionsDiv.appendChild(toggleBtn);
        actionsDiv.appendChild(deleteBtn);
        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(actionsDiv);
        taskListContainer.appendChild(taskDiv);
    });
}