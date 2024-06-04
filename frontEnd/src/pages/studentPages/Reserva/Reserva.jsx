import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import styles from './Reserva.module.css';
import { RadioGroup, Button } from "@nextui-org/react";
import { ScheduleMeeting, timeSlotDifference } from 'react-schedule-meeting';
import React, { useEffect, useState } from 'react';
import ListaDatos from "../../professorPages/ReservaAula/elements/ListaDatos";
import moment from 'moment-timezone';
import CustomModal from "../../LoginPage/components/CustomModal";
import { getToken } from "../../../helpers";



function Reserva() {
  const token = "Bearer " + getToken();
  const [datos, setDatos] = useState(null);
  const [idClase, setIdClase] = useState(null);

  const [warningMessage, setWarningMessage] = useState([]);
  const [message, setMessage] = useState([]);

  const [reservaCompletada, setReservaCompletada] = useState(false);
  const [reservaFallida, setReservaFallida] = useState(false);

  const [title, setTitle] = useState("INFORMACIÓN DE LA RESERVA");
  const [fechaFinReserva, setFechaFinReserva] = useState(null);
  const [recargarPagina, setRecargarPagina] = useState("/Index");
  let [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [startTimeSelected, setStartTimeSelected] = useState();



  const [availableTimeSlotsLessUnavailableTimeSlots, setAvailableTimeSlotsLessUnavailableTimeSlots] = useState([]);
  const [variableCambio, setVariableCambio] = useState(false);




  const unavailableTimeSlots = [

  ];



  useEffect(() => {
    fetch("http://localhost:8080/classrooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
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



  const handleSelectedOption = (idClase) => {
    setIdClase(idClase);
  }


  useEffect(() => {
    if(idClase != null){
      setAvailableTimeSlots([]);
      calendar();
    }
  }, [idClase]);



  const pedirArrayMesAPI = (mes, year) => {
    let url = "http://localhost:8080/classrooms/" + idClase + "/availability-student/" + mes + "/" + year + "";

    return fetch(url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
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

  const pedirArrayDiaAPI = (year, mes, dia) => {
    let url = "http://localhost:8080/classrooms/" + idClase + "/availability-student/" + dia + "/" + mes + "/" + year + "";

    return fetch(url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
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
    let cantidadMesesACargar = 6;

    for (let i = mesActual; i < mesActual + cantidadMesesACargar; i++) {
      if (i > 12) {
        let mesYearSiguiente = i - 12;
        pedirArrayMesAPI(mesYearSiguiente, year + 1).then(data => {
          obtenerFechas(year + 1, mesYearSiguiente, data);
        });
      } else {
        pedirArrayMesAPI(i, year).then(data => {
          obtenerFechas(year, i, data);
        })
      }
    }
  }



  const obtenerFechas = (year, mes, arrayMes) => {
    let hoy = new Date().getDate();
    let month = new Date().getMonth() + 1;

    arrayMes?.map((dia, index) => {
      if (dia == true && ((index + 1 >= hoy && mes == month) || (mes != month))) {
        let diaReal;
        diaReal = index + 1;
        pedirArrayDiaAPI(year, mes, diaReal).then(arrayDia => {
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



  useEffect(() => {
    const calculateAvailableTimeSlotsLessUnavailable = () => {
      const newAvailableTimeSlotsLessUnavailable = timeSlotDifference(availableTimeSlots, unavailableTimeSlots);
      setAvailableTimeSlotsLessUnavailableTimeSlots(newAvailableTimeSlotsLessUnavailable);
    };

    calculateAvailableTimeSlotsLessUnavailable();
  }, [availableTimeSlots]);




  const handleTimeslotClicked = (startTimeEventEmit) => {
    setStartTimeSelected(startTimeEventEmit.startTime);
  };



  useEffect(() => {
    setVariableCambio(!variableCambio);
  }, [startTimeSelected])





  const formatearHora = (date) => {
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    const cadenaFormateada = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

    return cadenaFormateada;
  }


  useEffect(() => {
    cambiarHoraFin();
  }, [startTimeSelected])

  const realizarReserva = () => {
    if (idClase != null && startTimeSelected != null) {

      let fechaInicio = formatearHora(startTimeSelected);
      let fechaFin = formatearHora(fechaFinReserva);
      let userId = localStorage.getItem("id");

      fetch("http://localhost:8080/reservation-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          startDate: fechaInicio,
          endDate: fechaFin,
          userId: userId,
          classroomId: idClase
        })
      }).then(response => {
        if (response.ok) {
          setMessage(["La reserva se ha realizado correctamente"]);
          setReservaCompletada(true);
        } else {
          setWarningMessage(["La reserva no se ha realizado"]);
          setReservaFallida(true);
        }
      });

    } else {
      setWarningMessage(["Alguno de los datos ingresados es incorrecto"]);
      setReservaFallida(true);
    }
  }

  const handleChange = (completado) => {
    setReservaFallida(completado);
  };


  const cambiarHoraFin = () => {
    const date = new Date(startTimeSelected);
    date.setHours(date.getHours() + 1);
    setFechaFinReserva(date);
  }




  return (
    <div>
      <main className="bg-azul text-foreground min-h-screen">
        <div>
          <BarraNavegacion></BarraNavegacion>
        </div>
        <div className={styles.reserva}>
          <h1 id={styles["crear-reserva"]}> CREAR UNA RESERVA </h1>

          <h2 className={styles["reserva-titles"]}>Seleccione el aula a reservar</h2>
          <div className={styles.conjuntoAulas}>
            <div className={styles.selectores}>
              <RadioGroup orientation="horizontal">
                <ListaDatos datos={datos} onSelectedOptionChange={handleSelectedOption} />
              </RadioGroup>
            </div>
          </div>
          <div className={styles.calendario}>

            <br />
            <br />
            <h2 className={styles["reserva-titles"]} >Seleccione una fecha y la hora de inicio de reserva </h2>
            <ScheduleMeeting
              borderRadius={10}
              primaryColor="#3f5b85"
              eventDurationInMinutes={60}
              availableTimeslots={availableTimeSlotsLessUnavailableTimeSlots}
              onStartTimeSelect={handleTimeslotClicked}
            />
          </div>
          <br />
          <br />

          <div className={styles["submit"]} >
            <Button
              size="xl"
              onClick={realizarReserva}
            >Realizar reserva de aula</Button>
          </div>
        </div>
        {<CustomModal titulo={title} text={message} cargar={reservaCompletada} onChange={null} recargarPagina={recargarPagina} />}
        {<CustomModal titulo={title} text={warningMessage} cargar={reservaFallida} onChange={handleChange} recargarPagina={false} />}

      </main>
    </div>

  );
}

export default Reserva;
