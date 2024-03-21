import { React, useState, useEffect } from "react";
import { Input, Button, ButtonGroup, RadioGroup, Radio, Card, CardHeader, CardBody } from "@nextui-org/react";
import "/src/styles.css"

function Register() {

  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (formChanged) {
        event.preventDefault();
        return ""; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formChanged]);




  return (
    <Card className="bg-background/90 px-10 pb-20 pt-20">
      <CardHeader className="text-xl font-bold justify-center items-center">
        <div className="flex flex-col items-center">
          <h1>RESERVA DE AULAS ETSISI</h1>
          <h2>Registro</h2>
          <br />
          <img
            className="w-36 h-36 object-center"
            src="/public/Logo.png"
            alt="Imagen logo web"
          />
        </div>
      </CardHeader>
      <CardBody className="space-y-2 iniciar-sesion-card-body">
        <Input
          color="#E5D9B6"
          type="nombre"
          label="Nombre"
          placeholder="Introduce tu nombre"
          onChange={() => setFormChanged(true)}
        />
        <Input
          color="#E5D9B6"
          type="apellido"
          label="Apellidos"
          placeholder="Introduce tus apellidos"
        />
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

        <div className="flex flex-col gap-3">
          <RadioGroup
            label="Tipo de usuario"
          >
            <Radio value="profesor">Profesor</Radio>
            <Radio value="alumno">Alumno</Radio>
          </RadioGroup>
        </div>
        <ButtonGroup className="flex pt-2">
          <Button color="#285430" className=" flex-1 hover:bg-green-600">
            Registrarse
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

export default Register;
