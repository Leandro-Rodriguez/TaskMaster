document.addEventListener('DOMContentLoaded', () => {
    
    async function obtenerDatos() {
        try {
            const response = await fetch('../Integration/jsonAdri/datos.json'); //estamos simulando el uso de solicitud GET
            const data = await response.json();  //como en las API al json hay que convertirlo a objeto 
            mostrarProyectos(data.Proyectos);
            mostrarUsuarios(data.Usuarios);
            mostrarTareas(data.Tareas);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    function mostrarProyectos(proyectos) {
        const projectContainer = document.getElementById('project-container');
        proyectos.forEach(proyecto => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            projectDiv.innerHTML = `
                <h2>${proyecto.nombre}</h2>
                <div>
                    ${proyecto.tareas.map(tarea => `
                        <div class="task">
                            <strong>${tarea.nombre}</strong> - Asignado a: ${tarea.asignadoA}, Prioridad: ${tarea.prioridad}, Plazo: ${tarea.plazoDeEntrega}, Status: ${tarea.status}
                        </div>
                    `).join('')}
                </div>
            `;
            projectContainer.appendChild(projectDiv);
        });
    }

    function mostrarTareas(tareas) {
        const tareaContainer = document.getElementById('tasks-container');
        tareas.forEach(tarea => {
            const tareaDiv = document.createElement('div');
            tareaDiv.classList.add('task');
            tareaDiv.innerHTML = `
                <h2>${tarea.nombre}</h2>
                <p>Asignado a: ${tarea.asignadoA}</p>
                <p>Prioridad: ${tarea.prioridad}</p>
                <p>Plazo de Entrega: ${tarea.plazoDeEntrega}</p>
                <p>Status: ${tarea.status}</p>
            `;
            tareaContainer.appendChild(tareaDiv);
        });
    }
    
    function mostrarUsuarios(usuarios) {
        const userContainer = document.getElementById('user-container');
        usuarios.forEach(usuario => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.innerHTML = `
                <h2>${usuario.nombre} ${usuario.apellido}</h2>
                <p>Email: ${usuario.email}</p>
                <p>Habilidades: HTML: ${usuario.habilidades.html}, CSS: ${usuario.habilidades.css}, JavaScript: ${usuario.habilidades.javascript}</p>
                <p>Frameworks: ${usuario.frameworks.join(', ')}</p>
                <p>Herramientas: ${usuario.herramientas.join(', ')}</p>
            `;
            userContainer.appendChild(userDiv);
        });
    }

    // Con esta funcion obtengo los datos del json
    obtenerDatos();

});
