import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import styles from './ReservaAula.module.css';
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { ScheduleMeeting, timeSlotDifference } from 'react-schedule-meeting';
import React, { useEffect, useState } from 'react';
import ListaDatos from "./elements/ListaDatos";
import moment from 'moment-timezone';



function Reserva() {
  const [datos, setDatos] = useState(null);
  const [idClase, setIdClase] = useState(null);



  useEffect(() => {
    fetch("http://localhost:8080/classrooms")
      .then(response => {
        if (!response.ok) {
          throw new Error("No se han obtenido los datos.");
        }
        return response.json();
      })
      .then(data => {
        setDatos(data);
      });
  }, []);


  const unavailableTimeSlots = [

  ];


  const handleSelectedOption = (idClase) => {
    setIdClase(idClase);
  }


  useEffect(() => {
    availableTimeSlots.splice(0, availableTimeSlots.length);
    calendar();
  }, [idClase]);



  let [availableTimeSlots, setAvailableTimeSlots] = useState([]);





  const pedirArrayMesAPI = (mes) => {
    let id = idClase;
    let month = mes;
    let url = "http://localhost:8080/classrooms/" + id + "/availability/" + month + "/TEACHER";
    let datos;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(e => {
      });
  };

  const pedirArrayDiaAPI = (mes, dia) => {
    let id = idClase;
    let month = mes;
    let day = dia;
    let url = "http://localhost:8080/classrooms/" + id + "/availability/" + month + "/" + day + "/TEACHER";

    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      });
  }

  const calendar = () => {
    let mesActual = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let cantidadMesesACargar = 1;

    for (let i = mesActual; i < mesActual + cantidadMesesACargar; i++) {
      if (i > 12) {
        let mesYearSiguiente = i - 12;
        pedirArrayMesAPI(mesYearSiguiente).then(data => {
          obtenerFechas(year + 1, mesYearSiguiente, data);
        });
      } else {
        pedirArrayMesAPI(i).then(data => {
          obtenerFechas(year, i, data);
        })
      }
    }
  }



  const obtenerFechas = (year, mes, arrayMes) => {
    let arrayDia = null;
    let hoy = new Date().getDate();
    let month = new Date().getMonth() + 1;

    arrayMes?.map((dia, index) => {
      if (dia == true && ((index + 1 >= hoy && mes == month) || (mes != month))) {
        let diaReal;
        diaReal = index + 1;
        pedirArrayDiaAPI(mes, diaReal).then(arrayDia => {
          arrayDia?.map((hora, index) => {
            let horaReal;
            if (hora == true) {
              horaReal = index + 9;
              generarFecha(year, mes, diaReal, horaReal);
            }
          })
        });
      }
    })
  }

  const generarFecha = (year, mes, dia, hora) => {

    const inicio = moment.tz([year, mes - 1, dia, hora, 0, 0], 'Europe/Madrid').format('YYYY-MM-DD HH:mm:ss');
    const fin = moment.tz([year, mes - 1, dia, hora + 1, 0, 0], 'Europe/Madrid').format('YYYY-MM-DD HH:mm:ss');

    const reserva = {
      startTime: inicio,
      endTime: fin
    }
    setAvailableTimeSlots(prevSlots => prevSlots.concat(reserva));
  }


  const [availableTimeSlotsLessUnavailableTimeSlots, setAvailableTimeSlotsLessUnavailableTimeSlots] = useState([]);

  useEffect(() => {
    const calculateAvailableTimeSlotsLessUnavailable = () => {
      const newAvailableTimeSlotsLessUnavailable = timeSlotDifference(availableTimeSlots, unavailableTimeSlots);
      setAvailableTimeSlotsLessUnavailableTimeSlots(newAvailableTimeSlotsLessUnavailable);
    };

    calculateAvailableTimeSlotsLessUnavailable();
  }, [availableTimeSlots]);



  const [startTimeSelected, setStartTimeSelected] = useState();

  const handleTimeslotClicked = (startTimeEventEmit) => {
    setStartTimeSelected(startTimeEventEmit.startTime);
    console.log(startTimeEventEmit.startTime);
  };






  return (
    <div>
      <main className="bg-azul text-foreground min-h-screen">
        <div>
          <BarraNavegacion></BarraNavegacion>
        </div>
        <div className={styles.reserva}>
          <div className={styles.conjuntoAulas}>


            <h1 id={styles["crear-reserva"]}> CREAR UNA RESERVA </h1>

            <h2 className={styles["reserva-titles"]}>Selecciona el aula a reservar:</h2>
            <div className={styles.selectores}>
              <RadioGroup orientation="horizontal">
                <ListaDatos datos={datos} onSelectedOptionChange={handleSelectedOption} />
              </RadioGroup>
            </div>
          </div>
          <div className={styles.calendario}>


            <h2 className={styles["reserva-titles"]} >Selecciona una fecha y una franja horaria: </h2>
            <ScheduleMeeting
              borderRadius={10}
              primaryColor="#3f5b85"
              eventDurationInMinutes={60}
              availableTimeslots={availableTimeSlotsLessUnavailableTimeSlots}
              onStartTimeSelect={handleTimeslotClicked}
            />

          </div>
        </div>

      </main>
    </div>

  );
}

export default Reserva;
