import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import styles from './AulasReservadas.module.css';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { EyeIcon } from "../../../assets/icons/EyeIcon";
import { columns } from "./elements/data";
import { Link } from 'react-router-dom';
import CustomModal from "../../studentPages/MisReservas/elements/CustomModal";


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


function AulasReservadas() {
  const [reservas, setReservas] = useState([]);
  const [title, setTitle] = useState("CANCELACIÓN DE RESERVA");
  const [warningMessage, setWarningMessage] = useState(["¿Estás seguro de que deseas cancelar la reserva?"]);
  const [cancelarReserva, setCancelarReserva] = useState(false);
  const [cancelarReservaDecision, setCancelarReservaDecision] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  const fetchData = () => {
    let id = 10;
    return fetch("http://localhost:8080/reservations/user/" + id)
      .then(response => {
        if (!response.ok) {
          throw new Error("No se han obtenido los datos.");
        }
        return response.json();
      })
      .then(data => {
        data.map((reserva) => {
          let fechaFormatoDia = obtenerFechaFormateada(reserva.startDate);
          let horaInicioFormateada = obtenerHoraMinutos(reserva.startDate);
          let horaFinFormateada = obtenerHoraMinutos(reserva.endDate);

          let r = {
            id: reserva.id,
            nombreAula: reserva.classroom.name,
            aula: reserva.classroom.number,
            fecha: fechaFormatoDia,
            horaInicio: horaInicioFormateada,
            horaFin: horaFinFormateada
          }
  
          setReservas(reservas => reservas.concat(r));
  
        })

      })
  }

  useEffect(() => {
    setReservas([]);
    fetchData();
  }, []);

  function obtenerFechaFormateada(fechaString) {
    const fecha = new Date(fechaString);
  
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()]; 
  
   
    const fechaFormateada = `${dia} de ${mes}`;
  
    return fechaFormateada;
  }

  function obtenerHoraMinutos(fechaString) {
    const fecha = new Date(fechaString);
  
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
  
    const horaMinutos = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
  
    return horaMinutos;
  }

  const eliminarReserva = (id) => {
    setCancelarReserva(true);
    setIdAEliminar(id);
  }

  useEffect(() => {
    if (cancelarReservaDecision) {
      console.log("Eliminando reserva con id: " + idAEliminar);
      fetch("http://localhost:8080/reservation/" + idAEliminar + "/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(respose => {
        if (respose.ok) {
          window.location.reload();
        } else {
          throw new Error("No se ha elimninado la reserva");
        }
      })

    }
  }, [cancelarReservaDecision]);

  const handleChange = (completado) => {
    setCancelarReserva(completado);
  };

  const cancelar = (decision) => {
    setCancelarReservaDecision(decision);
  }




  const renderCell = React.useCallback((reserva, columnKey) => {
    const cellValue = reserva[columnKey];


    switch (columnKey) {
      case "nombreAula":
        return (
          <User
            name={cellValue}
            description={reserva.aula}
          >
            {reserva.nombreAula}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link to={`/Detalles?id=${reserva.id}`}>
              <Tooltip content="Detalles" >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
            </Link>
            <div onClick={() => eliminarReserva(reserva.id)}>
              <Tooltip color="danger" content="Cancelar reserva" >
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>

          </div >
        );
      default:
        return cellValue;
    }
  }, []);



  return (
    <div >
      <main className="bg-azul text-foreground min-h-screen">
        <div>
          <BarraNavegacion></BarraNavegacion>
        </div>
        <div className={styles.reserva}>
          <h1 id={styles["mis-reservas"]}> MIS RESERVAS </h1>

          <Table>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={reservas}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>


        </div>
        {<CustomModal titulo={title} text={warningMessage} cargar={cancelarReserva} onChange={handleChange} recargarPagina={false} setCancelar={cancelar} />}

      </main>
    </div>

  );
}

export default AulasReservadas;
