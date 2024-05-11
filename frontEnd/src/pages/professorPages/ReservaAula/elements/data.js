/*async function obtenerData() {
    let url = "http://localhost:8080/classrooms";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        return data;
    } catch {
        console.error('Error:', error);
        throw error;
    }


}

export const data = await obtenerData();

*/
/*
const aulasData = [
    {
        id: 1,
        nombre: "Aula 1",
        numero: "3001"
    },
    {
        id: 2,
        nombre: "Aula 2",
        numero: "3003"
    },
    {
        id: 3,
        nombre: "Aula 3",
        numero: "3003"
    },
    {
        id: 4,
        nombre: "Laboratorio Juniper Ejemplo",
        numero: "3004"
    },

];*/




/*
    fetch("http://localhost:8080/classrooms")
    .then(response => {
        if (!response.ok) {
            console.log("No funciona");
        }
        return response.json();
    })
    .then(data => {
        // datos = data;
        console.log(data);
    });

    */

// FUNCIONAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 1
/*
import moment from 'moment-timezone';
import  {  useState } from 'react';


const arrayDates = [];

const [arrayMesActual, setArrayMesActual] = useState(null);

useEffect(() => {
    pedirArrayMesAPI(5);
}, []);

useEffect(() => {
    
        console.log(arrayMesActual);
    
}, [arrayMesActual]);

function pedirArrayMesAPI(mes) {
    let id = 1; // idClase
    let month = mes;
    let url = "http://localhost:8080/classrooms/" + id + "/availability/" + month + "/TEACHER";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then(data => {
            setArrayMesActual(data);
        });
}


pedirArrayMesAPI(5);

function pedirArrayDiaAPI(dia) {
    return [true, true, true, true, true];
}

function calendar() {
    let mesActual = new Date().getMonth();
    let year = new Date().getFullYear();
    let arrayMes;
    let cantidadMesesACargar = 6;

    for (let i = mesActual; i < mesActual + cantidadMesesACargar; i++) {

        if (i > 12) {
            let mesYearSiguiente = i - 12;
            pedirArrayMesAPI(mesYearSiguiente);
            arrayMes = arrayMesActual;
            console.log(arrayMes);
            obtenerFechas(year + 1, mesYearSiguiente, arrayMes);
        } else {
            arrayMes = pedirArrayMesAPI(i);
            obtenerFechas(year, i, arrayMes);
        }
    }
}

function obtenerFechas(year, mes, arrayMes) {
    let arrayDia = null;
    arrayMes.map((dia, index) => {
        if (dia == true) {
            let diaReal;
            diaReal = index + 1;
            arrayDia = pedirArrayDiaAPI(diaReal);

            arrayDia.map((hora, index) => {
                let horaReal;
                if (hora == true) {
                    horaReal = index + 9;
                    generarFecha(year, mes, diaReal, horaReal);
                }
            })
        }
    })
}

function generarFecha(year, mes, dia, hora) {

    const inicio = moment.tz([year, mes - 1, dia, hora, 0, 0], 'Europe/Madrid').format('YYYY-MM-DD HH:mm:ss');
    const fin = moment.tz([year, mes - 1, dia, hora + 1, 0, 0], 'Europe/Madrid').format('YYYY-MM-DD HH:mm:ss');

    const reserva = {
        startTime: inicio,
        endTime: fin
    }

    arrayDates.push(reserva);

}
*/
// calendar();
// console.log(arrayDates.length);

// FIN FUNCIONAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA 1


let url = "http://localhost:8080/classrooms/" + 6 + "/availability/" + 5 + "/" + 23 + "/TEACHER";

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });
