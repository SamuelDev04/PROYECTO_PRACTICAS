// Escuchamos el evento del formulario
document.getElementById('formTask').addEventListener('submit', saveTask);

// Funcion para guardar la tarea
function saveTask(e) {
    // Traemos los valores de titulo y descripcion por id
    // y lo guardamos en variables
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    
    // Creamos una constante donde se almacenara como objeto
    const task = {
        title,
        description
    };

    // Si no hay tareas la guardamos
    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        // Sino, si ya hay tareas
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Para actualizar las tareas
    getTasks();
    // Para resetear el formulario
    document.getElementById('formTask').reset();
    //Para que no se recargue la pagina
    e.preventDefault();
}

// Funcion para traer y mostrar las tareas
function getTasks() {
    /* Se definen dos variables, la primera para traer los
        datos almacenados en el localStorage y la segunda 
        simplemente para traer el elemento tasks */
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    // Limpiamos el div con clase tasks
    tasksView.innerHTML = '';

    /* El for nos sirve para recorrer el localStorage
        para poder traernos toda la información */
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;

        // Insertamos html desde js
        tasksView.innerHTML += 
        `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">
                    Delete
                </a>
            </div>
        </div>`;
    }

}

// Funcion para eliminar una tarea
function deleteTask(title) {
    // Traemos toda la información almacenada
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    // Recorremos el array
    for (let i = 0; i < tasks.length; i++) {
        /* Evaluamos si el titulo que esta guardado 
            es el mismo que se esta mostrando */
        if (tasks[i].title == title) {
            // Lo eliminamos
            tasks.splice(i, 1);
        }

    }

    // Enviamos la informacion pero con el registro ya borrado
    localStorage.setItem('tasks',JSON.stringify(tasks));
    // Llamamos la funcion para mostrar las tareas
    getTasks();
}

// Corremos desde un principio la funcion para que muestre los datos
getTasks();