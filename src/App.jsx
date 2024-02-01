import './App.css'
import React from 'react';
import {Input} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import {Card, CardHeader, CardBody} from "@nextui-org/react";

function App() {
  return (
    <React.Fragment>
      <Card className=" border-none bg-background/30 table-row px-10 pb-10 pt-5 ">
        <CardHeader className='text-xl font-bold'>HERRAMIENTA DE RESERVA DE AULAS ETSISI</CardHeader>
        <CardBody className='space-y-2 px-7'>
          <Input type="email" label="Email" placeholder="Introduce tu email" />
          <Input type="password" label="Contraseña" placeholder="Introduce tu contraseña" />
          
          <ButtonGroup className='flex pt-2'>
            <Button className='flex-1 hover:bg-blue-600'>Iniciar sesión</Button>
            <Button className='flex-1 hover:bg-green-600'>Registrarse</Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </React.Fragment>
    
  )
}

export default App
