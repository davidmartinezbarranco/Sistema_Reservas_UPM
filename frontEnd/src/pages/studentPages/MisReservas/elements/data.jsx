const columns = [
  { name: "AULA", uid: "nombreAula" },
  { name: "CLASE", uid: "aula" },
  { name: "FECHA", uid: "fecha" },
  { name: "HORA INICIO", uid: "horaInicio" },
  { name: "HORA FIN", uid: "horaFin" },
  { name: "ACCIONES", uid: "actions" },
];

var date = new Date(2024, 5, 14, 9, 0);

var hora = date.getHours();
var minutos = date.getMinutes();

hora = hora < 10 ? '0' + hora : hora;
minutos = minutos < 10 ? '0' + minutos : minutos;
var horaYMinutos = hora + ':' + minutos;
hora = parseInt(hora) +2;

var dia = date.getDate();
var mes = date.getMonth();

var nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var nombreMes = nombreMeses[mes];

var diaYMes = dia + ' de ' + nombreMes;
var horaYMinutosFin = hora + ':' + minutos;

const reservas = [
  {
    id: 1,
    nombreAula: "Aula 1",
    aula: 3003,
    fecha: diaYMes,
    horaInicio: horaYMinutos,
    tiempoReserva: 2,
    horaFin: horaYMinutosFin
  },
  {
    id: 1,
    nombreAula: "Aula 2",
    aula: 2000,
    fecha: diaYMes,
    hora: horaYMinutos
  },
  {
    id: 1,
    nombreAula: "Aula 3",
    aula: 1204,
    fecha: diaYMes,
    hora: horaYMinutos
  },
  {
    id: 1,
    nombreAula: "Aula 4",
    aula: 3013,
    fecha: diaYMes,
    hora: horaYMinutos
  }

]


export { columns, reservas };
