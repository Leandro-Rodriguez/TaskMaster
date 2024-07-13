document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('newTaskForm');
    const taskList = document.getElementById('ListaDeTareasAsignadasTotal');

    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid' ],
      initialView: 'dayGridMonth'
    });
    calendar.render();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskName = document.getElementById('taskName').value;
        const taskEmployee = document.getElementById('taskEmployee').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDeadline = document.getElementById('taskDeadline').value;
        const taskPriority = document.getElementById('taskPriority').value;

        const task = {
            id: Date.now(),
            name: taskName,
            employee: taskEmployee,
            description: taskDescription,
            deadline: taskDeadline,
            priority: taskPriority,
            completed: false
        };

        saveTask(task);
        renderTask(task);
        taskForm.reset();
    });

    function saveTask(task) {
        let ListaDeTareasAsignadasTotal = JSON.parse(localStorage.getItem('ListaDeTareasAsignadasTotal')) || [];
        ListaDeTareasAsignadasTotal.push(task);
        localStorage.setItem('ListaDeTareasAsignadasTotal', JSON.stringify(ListaDeTareasAsignadasTotal));
    }

    function renderTask(task) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.employee}</p>
            <p>${task.description}</p>
            <p>Fecha Límite: ${task.deadline}</p>
            <p>Prioridad: ${task.priority}</p>
            <button class="complete-task">Completada</button>
            <button class="delete-task">Borrar</button>
        `;
        taskList.appendChild(taskElement);
    }

    function loadTasks() {
        const ListaDeTareasAsignadasTotal = JSON.parse(localStorage.getItem('ListaDeTareasAsignadasTotal')) || [];
        ListaDeTareasAsignadasTotal.forEach(renderTask);
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-task')) {
            const taskElement = e.target.parentElement;
            completeTask(taskElement.dataset.id);
            taskElement.classList.add('completed');
        } else if (e.target.classList.contains('delete-task')) {
            const taskElement = e.target.parentElement;
            deleteTask(taskElement.dataset.id);
            taskElement.remove();
        }
    });

    function completeTask(id) {
        let ListaDeTareasAsignadasTotal = JSON.parse(localStorage.getItem('ListaDeTareasAsignadasTotal')) || [];
        ListaDeTareasAsignadasTotal = ListaDeTareasAsignadasTotal.map(task => task.id == id ? { ...task, completed: true } : task);
        localStorage.setItem('ListaDeTareasAsignadasTotal', JSON.stringify(ListaDeTareasAsignadasTotal));
    }

    function deleteTask(id) {
        let ListaDeTareasAsignadasTotal = JSON.parse(localStorage.getItem('ListaDeTareasAsignadasTotal')) || [];
        ListaDeTareasAsignadasTotal = ListaDeTareasAsignadasTotal.filter(task => task.id != id);
        localStorage.setItem('ListaDeTareasAsignadasTotal', JSON.stringify(ListaDeTareasAsignadasTotal));
    }

    loadTasks();
});

// Funciones de integración
const apiUrl = 'https://api.example.com/tasks'; // URL de ejemplo para la API

async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        const ListaDeTareasAsignadasTotal = await response.json();
        ListaDeTareasAsignadasTotal.forEach(task => renderTask(task));
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function createTask(task) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const newTask = await response.json();
        renderTask(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
    }
}

async function updateTask(task) {
    try {
        await fetch(`${apiUrl}/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Sobrescribiendo las funciones locales para usar la API
saveTask = createTask;
completeTask = async (id) => {
    const task = { ...ListaDeTareasAsignadasTotal.find(task => task.id == id), completed: true };
    await updateTask(task);
};
deleteTask = async (id) => {
    await deleteTask(id);
};

function showAlert() {
    Swal.fire({
      title: 'Creada!!',
      text: 'Tarea creada exitosamente',
      icon: 'success'
    });
  }