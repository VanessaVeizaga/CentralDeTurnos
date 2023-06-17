class Turno {
    constructor(id, dni, nombre, apellido, especialidad, profesional = 0, fecha = 0, hora = 0) {
        this.id = id,
        this.dni = dni,
        this.nombre = nombre,
        this.apellido= apellido 
        this.especialidad = especialidad,
        this.profesional = profesional,
        this.fecha = fecha,
        this.hora = hora
    }
}

let turnos = [];

if(localStorage.getItem("turnos")) {
    turnos = JSON.parse(localStorage.getItem("turnos"));
}

const titulo = document.getElementById("titulo");
const subtitulo = document.getElementById("subtitulo");
const menuPrincipal = document.getElementById("menuPrincipal");
const opcionesPersonal = document.getElementById("opcionesPersonal");
const vistaGuardia = document.getElementById("vistaGuardia");
const vistaEspecialidades = document.getElementById("vistaEspecialidades");
const turnosGuardia = document.getElementById("turnosGuardia");
const turnosEspecialidades = document.getElementById("turnosEspecialidades");
const vistaPaciente = document.getElementById("vistaPaciente");
const botonInicio = document.getElementById("botonInicio");
const formCalcular = document.getElementById("formCalcular");
const formEspecialidades = document.getElementById("formEspecialidades");
const formBasico = document.getElementById("formBasico");
const formConsultar = document.getElementById("formConsultar");
const consultarTurnos = document.getElementById("consultarTurnos");
const contenedorGuardia = document.getElementById("contenedorGuardia");
const contenedorEspecialidades = document.getElementById("contenedorEsp");

//Función para mostrar turnos

const mostrarTurnos = (turnos) => {
    contenedorEspecialidades.innerHTML = "";
    contenedorGuardia.innerHTML = ``;
    turnos.forEach(turno => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <th scope="row">${turno.id}</th>
                    <td>${turno.nombre} ${turno.apellido}</td>
                    <td>${turno.dni}</td>`
        if (turno.id[0] == "E") {
            fila.innerHTML += `
                    <td>${turno.especialidad}</td>
                    <td>${turno.profesional}</td>
                    <td>${turno.fecha}</td>
                    <td>${turno.hora}</td>`
        }
        fila.innerHTML += `
                    <td>
                    <div class="form-check justify-content-center">
                        <input class="form-check-input m-0" type="radio" name="flexRadioDefault" id="radio${turno.id}">
                    </div>
                    </td>`
        if(turno.id[0] == "E") {
            contenedorEspecialidades.appendChild(fila);
        } else {
            contenedorGuardia.appendChild(fila);
        }

        //Eliminar turnos
        const radio = document.getElementById(`radio${turno.id}`);
        radio.addEventListener("change", () => {
            eliminarTurno(turno.id);
            if(turno.id) {
                radio.checked = false;
            }
        })
    })
}

mostrarTurnos(turnos);

//Función para eliminar turnos.

const eliminarTurno = (id) => {
    const turnoAEliminar = turnos.find(turno => turno.id === id);
    const dni = turnoAEliminar.dni;
    Swal.fire({
        title: '¿Está seguro que desea eliminar este turno?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
            if (turnoAEliminar) {
                turnos.splice(turnos.indexOf(turnoAEliminar), 1);
            }
            localStorage.setItem("turnos", JSON.stringify(turnos));
            if(id[0] == "G") {
                contenedorGuardia.innerHTML = "";
                mostrarTurnos(turnos);
            } else {
                contenedorEspecialidades.innerHTML = "";
                const turnosAConsultar = turnos.filter(turno => turno.dni = dni)
                if(turnosAConsultar) {
                    mostrarTurnos(turnosAConsultar);
                }
            }
            Swal.fire(
                `Eliminado`,
                'Turno eliminado exitosamente',
                'success'
          )
        }
      })
}

//Botón para personal administrativo
const botonPersonal = document.getElementById("personal");
botonPersonal.addEventListener("click", () => {
    subtitulo.textContent = "Gestionar turnos de:";
    menuPrincipal.style.display = "none";
    botonInicio.style.display = "block";
    opcionesPersonal.style.display = "block";
}); 

//Botón para gestionar turnos de guardia médica
const botonGuardia = document.getElementById("guardia");
botonGuardia.addEventListener("click", () => {
    titulo.textContent = "Central de turnos - Guardia médica";	
    subtitulo.textContent = "Registrar nuevo turno:";
    opcionesPersonal.style.display = "none";
    vistaGuardia.style.display = "block";
    turnosGuardia.style.display = "block";
}); 

//Botón para gestionar turnos de especialidades
const botonEspecialidades = document.getElementById("especialidades");
botonEspecialidades.addEventListener("click", () => {
    titulo.textContent = "Central de turnos - Especialidades";	
    subtitulo.textContent = "Registrar nuevo turno:";
    opcionesPersonal.style.display = "none";
    vistaEspecialidades.style.display = "block";
    vistaGuardia.style.display = "block";
    consultarTurnos.style.display = "block";
}); 

//Botón para pacientes
const botonPaciente = document.getElementById("paciente");
botonPaciente.addEventListener("click", () => {
    titulo.textContent = "Central de turnos - Guardia médica";	
    subtitulo.textContent = "Tiempo estimado de espera:"
    menuPrincipal.style.display = "none";
    botonInicio.style.display = "block";
    vistaPaciente.style.display = "block";
    formCalcular.style.display = "block";
    contenedorTiempo.style.display = "none";
})

//Botón para volver a Inicio
botonInicio.addEventListener("click", () => {
    titulo.textContent = "Central de turnos";
    subtitulo.textContent = "Ingresar como:";
    menuPrincipal.style.display = "block";
    vistaGuardia.style.display = "none";
    vistaEspecialidades.style.display = "none";
    vistaPaciente.style.display = "none";
    botonInicio.style.display = "none";
    turnosGuardia.style.display = "none";
    turnosEspecialidades.style.display = "none";
    opcionesPersonal.style.display = "none";
    consultarTurnos.style.display = "none";
    formEspecialidades.reset();
    formBasico.reset();
    formCalcular.reset();
    formConsultar.reset();


})

//Botón para registar un nuevo turno

let nroTurnoGuardia = localStorage.getItem("nroTurnoGuardia") || 0;
let nroTurnoEsp = localStorage.getItem("nroTurnoEsp") || 0;
const botonRegistrar = document.getElementById("registrarNuevo");
botonRegistrar.addEventListener("click", (e) => {
    e.preventDefault();
    let especialidad = document.getElementById("especialidad").value;
    let profesional = document.getElementById("profesional").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let nombrePaciente = document.getElementById("nombre").value;
    let apellidoPaciente = document.getElementById("apellido").value;
    let dniPaciente = document.getElementById("dni").value
    let id;
    console.log(especialidad, profesional, fecha, hora, nombrePaciente, apellidoPaciente, dniPaciente);
    if(nombrePaciente != "" & apellidoPaciente != "" & dniPaciente != "" & especialidad != "" & profesional != "" & fecha != "" & hora != "") {
        if(especialidad == "0") {
            nroTurnoGuardia++;
            id = "G" + nroTurnoGuardia;
        } else {
            nroTurnoEsp++;
            id = "E" + nroTurnoEsp;
        }
        turnos.push(new Turno(id, dniPaciente, nombrePaciente, apellidoPaciente, especialidad , profesional, fecha, hora));
        localStorage.setItem("turnos", JSON.stringify(turnos));
        localStorage.setItem("nroTurnoGuardia", nroTurnoGuardia);
        localStorage.setItem("nroTurnoEsp", nroTurnoEsp);
        formBasico.reset();
        formEspecialidades.reset();
        Swal.fire(`Nuevo turno asignado al paciente ${nombrePaciente} ${apellidoPaciente}: ${id}`)
        if(especialidad == "0") {
            mostrarTurnos(turnos)
        }
    } else {
        Swal.fire(`Debe completar todos los campos para registrar un nuevo turno`)
    }

})

//Botón para consultar turnos de especialidades

const consultar = document.getElementById("consultar");
consultar.addEventListener("click", (e) => {
    e.preventDefault();
    turnosEspecialidades.style.display = "block";
    const dniConsulta = document.getElementById("dniConsulta").value;
    if (dniConsulta) {
        const turnosAConsultar = turnos.filter(turno => turno.dni == dniConsulta)
        if(turnosAConsultar) {
            mostrarTurnos(turnosAConsultar);
        }
    } else {
        Swal.fire(`Debe ingresar el DNI del paciente a consultar`)
    }
    formConsultar.reset();  
})

//Botón para calcular el tiempo estimado de espera

const contenedorTiempo = document.getElementById("contenedorTiempo");
const botonCalcular = document.getElementById("calcular");
botonCalcular.addEventListener("click", (e) => {
    e.preventDefault();
    const idTurno = document.getElementById("idTurno").value;
    if (idTurno) {
        formCalcular.style.display = "none";
        contenedorTiempo.style.display = "block";
        const turnoAConsultar = turnos.find(turno => turno.id === idTurno.toUpperCase());
        if(turnoAConsultar){
            contenedorTiempo.innerHTML = `
                                        <h3>Tiempo estimado de espera para el/la paciente <b>${turnoAConsultar.nombre} ${turnoAConsultar.apellido}</b>:</h3>
                                        <p>${calcularTiempo(turnos.filter(turno => turno.id[0] == "G").indexOf(turnoAConsultar) + 1)}</p>`
        } else {
            contenedorTiempo.innerHTML = `
                                        <h3>No hay pacientes en espera con el Id de turno ingresado.</h3>`                        
        }
       formCalcular.reset();
    } else {
        Swal.fire(`Ingrese el Id de su turno, por favor`)

    }
   
})

function calcularTiempo (cantidadTurnos) {
    let tiempo = cantidadTurnos * 10;
    let horas;
    let minutos;
    if (tiempo < 60)  {
        horas = 0;
        minutos = tiempo;
    } else {
        horas = (tiempo - tiempo % 60) / 60;
        minutos = tiempo % 60;
    }
    if (horas == 0) {
        return minutos + " minutos"
    } else if (horas == 1 && minutos == 0) {
        return horas + " hora"
    } else if (horas == 1 && minutos != 0) {
        return horas + " hora y " + minutos + " minutos"
    } else if (horas > 1 && minutos == 0) {
        return horas + " horas"
    } else {
        return horas +" horas y " + minutos + " minutos"
    }       
}

//Botón para que el paciente acceda al registro de turnos de especialidades

const registroPaciente = document.getElementById("registroPaciente");
registroPaciente.addEventListener("click", () => {
    titulo.textContent = "Central de turnos - Especialidades";	
    subtitulo.textContent = "Registrar nuevo turno:";
    vistaPaciente.style.display = "none"
    vistaEspecialidades.style.display = "block";
    vistaGuardia.style.display = "block";
    consultarTurnos.style.display = "block";
})

