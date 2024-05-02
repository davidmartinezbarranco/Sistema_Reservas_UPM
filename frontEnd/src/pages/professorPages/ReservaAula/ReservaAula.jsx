import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import styles from './ReservaAula.module.css';
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { ScheduleMeeting } from 'react-schedule-meeting';
import React, { useState } from 'react';
import { data } from "./elements/data";
import ListaDatos from "./elements/ListaDatos";
  

function Reserva() {
  // Pidiendo datos al servidor
  const [aulas, setDatos] = useState({});

  const aulasDisponibles = aulas.aulasDisponibles;
  const horasDisponibles = aulas.horasDisponibles;


  // en el array selecciono desde el día de hoy, qué días hay disponibles para reservar
  const availableTimeslots = [0, 1, 2, 3, 4, 14].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(21, 0, 0, 0)),
    };
  });

  const horaSeleccionada = () => {
    console.log("he llegado");

  }


  return (
    <div>
      <main className="bg-azul text-foreground min-h-screen">
        <div>
          <BarraNavegacion></BarraNavegacion>
        </div>
        <div className={styles.reserva}>
          <h1 id={styles["crear-reserva"]}> CREAR UNA RESERVA </h1>

          <h2 className={styles["reserva-titles"]}>Selecciona el aula a reservar:</h2>
          <div className={styles.selectores}>
            <RadioGroup orientation="horizontal">
              <ListaDatos datos={data} />
            </RadioGroup>
          </div>

          <h2 className={styles["reserva-titles"]} >Selecciona una fecha y una franja horaria: </h2>
          <ScheduleMeeting
            borderRadius={10}
            primaryColor="#3f5b85"
            eventDurationInMinutes={60}
            availableTimeslots={availableTimeslots}
            onStartTimeSelect={console.log}
          />
        </div>

      </main>
    </div>

  );
}

export default Reserva;
