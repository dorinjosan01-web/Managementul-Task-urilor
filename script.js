document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const dateDisplay = document.getElementById('current-date');

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

    // Load tasks from LocalStorage
    let tasks = JSON.parse(localStorage.getItem('plannerTasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('plannerTasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}" data-index="${index}">
                    ${task.text}
                </span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    };

    const toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    taskList.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (index === null) return;

        if (e.target.classList.contains('delete-btn')) {
            deleteTask(index);
        } else if (e.target.classList.contains('task-text')) {
            toggleTask(index);
        }
    });

    // Initial render
    renderTasks();
});