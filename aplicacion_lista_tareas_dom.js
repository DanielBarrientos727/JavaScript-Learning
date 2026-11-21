
// Seleccionar elementos del HTML
const formulario = document.getElementById("formulario-tarea");
const entradaTarea = document.getElementById("entrada-tarea");
const listaTareas = document.getElementById("lista-tareas");

const totalTareas = document.getElementById("total-tareas");
const tareasCompletadas = document.getElementById("tareas-completadas");
const tareasPendientes = document.getElementById("tareas-pendientes");

// Arreglo donde se guardarán las tareas
let tareas = [];

// Función para agregar tareas
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = entradaTarea.value.trim();

    // Evitar tareas vacías
    if (texto === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Crear una nueva tarea
    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);

    entradaTarea.value = "";

    mostrarTareas();
});

// Función para mostrar las tareas
function mostrarTareas() {

    listaTareas.innerHTML = "";

    tareas.forEach(function(tarea) {

        const elemento = document.createElement("li");

        const textoTarea = document.createElement("span");
        textoTarea.textContent = tarea.texto;

        if (tarea.completada) {
            elemento.classList.add("completada");
        }

        elemento.appendChild(textoTarea);

        const botones = document.createElement("div");
        botones.classList.add("botones-tarea");

        // Botón completar
        if (!tarea.completada) {

            const botonCompletar = document.createElement("button");
            botonCompletar.textContent = "Completar";

            botonCompletar.addEventListener("click", function() {
                completarTarea(tarea.id);
            });

            botones.appendChild(botonCompletar);
        }

        // Botón eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton-eliminar");

        botonEliminar.addEventListener("click", function() {
            eliminarTarea(tarea.id);
        });

        botones.appendChild(botonEliminar);

        elemento.appendChild(botones);

        listaTareas.appendChild(elemento);
    });

    actualizarContadores();
}

// Función para completar una tarea
function completarTarea(id) {

    tareas = tareas.map(function(tarea) {

        if (tarea.id === id) {
            tarea.completada = true;
        }

        return tarea;
    });

    mostrarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(id) {

    tareas = tareas.filter(function(tarea) {
        return tarea.id !== id;
    });

    mostrarTareas();
}

// Función para actualizar los contadores
function actualizarContadores() {

    const total = tareas.length;

    const completadas = tareas.filter(function(tarea) {
        return tarea.completada;
    }).length;

    const pendientes = total - completadas;

    totalTareas.textContent = total;
    tareasCompletadas.textContent = completadas;
    tareasPendientes.textContent = pendientes;
}
