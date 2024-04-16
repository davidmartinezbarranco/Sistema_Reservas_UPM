import BarraNavegacion from "../Inicio/componentes/BarraNavegacion";
import './MisReservas.css';
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

            <Link to={`/Edicion?id=${reserva.id}`}>
              <Tooltip content="Editar reserva">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
            </Link>

            <Tooltip color="danger" content="Cancelar reserva">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>

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
        <div className="reserva">
          <h1 id="crear-reserva"> MIS RESERVAS </h1>

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

      </main>
    </div>

  );
}

export default MisReservas;
