import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import './MisReservas.css';
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { ScheduleMeeting } from 'react-schedule-meeting';
import React, { useState, useEffect } from 'react';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { EditIcon } from "./elements/EditIcon";
import { DeleteIcon } from "./elements/DeleteIcon";
import { EyeIcon } from "./elements/EyeIcon";
import { columns, reservas } from "./elements/data";
import { Link } from 'react-router-dom';



const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


function MisReservas() {

  // Pidiendo datos al servidor
  const [aulas, setDatos] = useState({});

  useEffect(() => {
    // Solicitar información al servidor usando Fetch API cuando el componente se monta
    fetch('/aulas')
      .then(response => response.json())
      .then(data => {
        setDatos(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const aulasDisponibles = aulas.aulasDisponibles;
  const horasDisponibles = aulas.horasDisponibles;

  const renderCell = React.useCallback((reserva, columnKey) => {
    const cellValue = reserva[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: reserva.avatar }}
            description={reserva.email}
            name={cellValue}
          >
            {reserva.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{reserva.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[reserva.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link to="/Detalles">
              <Tooltip content="Detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
            </Link>
            <Tooltip content="Editar reserva">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Cancelar reserva">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
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
        <div className="reserva">
          <h1 id="crear-reserva"> MIS RESERVAS </h1>

          <Table aria-label="Example table with custom cells">
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

      </main>
    </div>

  );
}

export default MisReservas;

