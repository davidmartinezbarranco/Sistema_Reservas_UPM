const columns = [
  { name: "AULA", uid: "nombreAula" },
  { name: "FECHA", uid: "fecha" },
  { name: "HORA INICIO", uid: "horaInicio" },
  { name: "HORA FIN", uid: "horaFin" },
  { name: "ACCIONES", uid: "actions" },
];

var date = new Date(2024, 5, 14, 9, 0);

function obtenerHoraYMinutos(date) {
  var hora = date.getHours();
  var minutos = date.getMinutes();

  hora = hora < 10 ? '0' + hora : hora;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  return hora + ':' + minutos;
}

function obtenerFecha(date) {
  var dia = date.getDate();
  var mes = date.getMonth();

  var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var nombreMes = nombreMeses[mes];

  return dia + ' de ' + nombreMes;

}

var horaYMinutos = obtenerHoraYMinutos(date);
var diaYMes = obtenerFecha(date);

var dateFin = new Date(2024, 5, 14, 11, 0);
var horaYMinutosFin = obtenerHoraYMinutos(dateFin);


const reservas = [
  {
    id: 1,
    nombreAula: "Laboratorio 1",
    aula: 3003,
    fecha: diaYMes,
    horaInicio: horaYMinutos,
    tiempoReserva: 2,
    horaFin: horaYMinutosFin
  },
  {
    id: 2,
    nombreAula: "Laboratorio Juniper",
    aula: 2000,
    fecha: diaYMes,
    horaInicio: horaYMinutos,
    tiempoReserva: 2,
    horaFin: horaYMinutosFin
  },
  {
    id: 3,
    nombreAula: "Aula 3",
    aula: 1204,
    fecha: diaYMes,
    horaInicio: horaYMinutos,
    tiempoReserva: 2,
    horaFin: horaYMinutosFin
  },
  {
    id: 4,
    nombreAula: "Aula 4",
    aula: 3013,
    fecha: diaYMes,
    horaInicio: horaYMinutos,
    tiempoReserva: 2,
    horaFin: horaYMinutosFin
  }

]


export { columns, reservas };
