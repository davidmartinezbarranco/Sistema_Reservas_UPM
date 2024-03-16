import React from "react";
import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import "../styles.css"

function NotRegistered({onToggle}) {


  return (
    <Card id="Not-registered-box" className="border-none bg-background/70 px-5">
      <div className="flex flex-col justify-center items-center h-full">

        <CardBody className="flex flex-col items-center justify-center">
            <h1> ¿Aún no tienes una cuenta?</h1>
            <h2> Regístrate para que puedas iniciar sesión </h2>
          <Button onClick={onToggle}>Regístrate</Button>

        </CardBody>
      </div>
    </Card>
  );
}

export default NotRegistered;
