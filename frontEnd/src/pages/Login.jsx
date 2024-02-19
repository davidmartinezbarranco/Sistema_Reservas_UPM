import React from "react";
import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

function Login() {
  return (
    <Card className="border-none bg-background/90 table-row px-10 pb-10 pt-5 ">
      <CardHeader className="text-xl font-bold">
        <div className="flex flex-col items-center justify-center">
          <h1>HERRAMIENTA DE RESERVA DE AULAS ETSISI</h1>
          <img
            className="w-36 h-36 object-center"
            src="frontEnd\public\Logo.png"
            alt="Imagen logo web"
          />
        </div>
      </CardHeader>
      <CardBody className="space-y-2 px-7">
        <Input
          color="#E5D9B6"
          type="email"
          label="Email"
          placeholder="Introduce tu email"
        />
        <Input
          color="#285430"
          type="password"
          label="Contraseña"
          placeholder="Introduce tu contraseña"
        />
        <ButtonGroup className="flex pt-2">
          <Button color="#285430" className="flex-1 hover:bg-blue-600">
            Iniciar sesión
          </Button>
          <Button color="#285430" className=" flex-1 hover:bg-green-600">
            Registrarse
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

export default Login;
