import BarraNavegacion from "./../Inicio/componentes/BarraNavegacion";
import './Reserva.css';
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { ScheduleMeeting } from 'react-schedule-meeting';


export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};


function Reserva() {
  // en el array selecciono desde el día de hoy, qué días hay disponibles para reservar
  const availableTimeslots = [0, 1, 2, 3, 4, 14].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(21, 0, 0, 0)),
    };
  });

  const horaSeleccionada = () =>{
    console.log("he llegado");
    
  }


  return (
    <div >
      <main className="bg-azul text-foreground min-h-screen">
        <div>
          <BarraNavegacion></BarraNavegacion>
        </div>
        <div className="reserva">
          <h1 id="crear-reserva"> CREAR UNA RESERVA </h1>

          <h2 className="reserva-titles">Selecciona el aula a reservar:</h2>
          <div className="selectores">
            <RadioGroup>
              <CustomRadio description="Bloque III" value="aula-1">
                Aula 1
              </CustomRadio>
              <CustomRadio description="Bloque IV" value="aula-2">
                Aula 2
              </CustomRadio>
              <CustomRadio description="Bloque IV" value="lab-1">
                Laboratorio 1
              </CustomRadio>
            </RadioGroup>
          </div>


          <h2 className="reserva-titles" >Selecciona una fecha y una franja horaria: </h2>
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
