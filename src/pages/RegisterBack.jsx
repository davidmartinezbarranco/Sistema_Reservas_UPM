import React from "react";
import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

function RegisterBack() {
  return (
    <Card className="border-none bg-background/70 px-10 pb-5 pt-10">
      <CardHeader className="text-xl font-bold justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1> ¿Aún no estás registrado?</h1>
        </div>
      </CardHeader>
      <CardBody className="text-m justify-center">
        <p> Regístrate para que puedas inciar sesión </p>
        <br />
          <Button>
            Regístrate
          </Button>
    
      </CardBody>
    </Card>
  );
}

export default RegisterBack;
