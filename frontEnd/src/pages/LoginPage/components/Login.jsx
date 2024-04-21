import React from "react";
import { Input, Button, ButtonGroup, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import "/src/styles.css";

function Login({ onChildChange }) {

  const inputsArray = [];

  const obtenerInformacionInputs = () => {
    const inputs = document.querySelectorAll('.login-form Input');
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      const empty = true;
      inputsArray.push({ id, empty });
    });

  };

  obtenerInformacionInputs();


  const formIsEmpty = () => {
    var empty = true;

    inputsArray.forEach(i => {
      if (i.empty === false) empty = false;
    })
    return empty;
  }

  const handleInputChange = (event) => {
    updateForm(event.target, event.target.value.trim() === '');
    onChildChange(formIsEmpty());
  };

  const updateForm = (input, changed) => {
    console.log(changed);
    inputsArray.forEach(i => {
      if (i.id === input.id) i.empty = changed;
    })
  }


  return (
    <Card className="bg-background/90 px-10 pb-20 pt-20 mt-10 mb-10">
      <CardHeader className="text-xl font-bold justify-center items-center">
        <div className="flex flex-col items-center">
          <h1>RESERVA DE AULAS ETSISI</h1>
          <h2>Iniciar sesión</h2>
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
          id="login-email"
          className="login-form"
          color="#E5D9B6"
          type="email"
          label="Email"
          placeholder="Introduce tu email"
          onChange={handleInputChange}
        />
        <Input
          id="login-password"
          className="login-form"
          color="#285430"
          type="password"
          label="Contraseña"
          placeholder="Introduce tu contraseña"
          onChange={handleInputChange}
        />
        <ButtonGroup className="flex pt-2">
          <Link href="/Index" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="#285430" className="flex-1 hover:bg-blue-600">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/Indice" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="#285430" className="flex-1 hover:bg-blue-600">
              Iniciar sesión - profesor
            </Button>
          </Link>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

export default Login;
