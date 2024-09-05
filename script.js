document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');
    const taskPriority = document.getElementById('taskPriority');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.classList.add(taskPriority.value);
    const taskContent = document.createElement('span');
    taskContent.innerHTML = `${taskInput.value}
    <small>${taskDate.value ? `Due: ${taskDate.value}`:''}
    ${taskTime.value ? `at ${taskTime.value} `:''}</small>`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(taskItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(taskItem);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = () => toggleComplete(taskItem);

    taskItem.appendChild(taskContent);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(completeButton);

    taskList.appendChild(taskItem);
    saveTasks();

    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
    taskPriority.value = 'low';
}

function toggleComplete(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasks();
}
function editTask(taskItem) {
    const newContent = prompt('Edit task:', taskItem.querySelector('span').textContent.trim());
    if (newContent) {
        taskItem.querySelector('span').innerHTML = newContent;
        saveTasks();
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks();
}

function filterTasks(status) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        if (status === 'all') {
            task.style.display = '';
        } else if (status === 'completed') {
            task.style.display = task.classList.contains('completed') ? '' : 'none';
        } else if (status === 'pending') {
            task.style.display = !task.classList.contains('completed') ? '' : 'none';
        }
    });
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push({
            content: task.querySelector('span').innerHTML,
            completed: task.classList.contains('completed'),
            priority: task.classList.contains('low') ? 'low' :
                      task.classList.contains('medium') ? 'medium' : 'high'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.classList.add(task.priority);
        if (task.completed) taskItem.classList.add('completed');
        
        const taskContent = document.createElement('span');
        taskContent.innerHTML = task.content;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(taskItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(taskItem);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => toggleComplete(taskItem);

        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(completeButton);

        taskList.appendChild(taskItem);
     });
}
