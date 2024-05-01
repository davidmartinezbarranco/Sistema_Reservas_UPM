import { React, useState } from "react";
import { Input, Button, ButtonGroup, RadioGroup, Radio, Card, CardHeader, CardBody } from "@nextui-org/react";
import "/src/styles.css"

function Register({ onChildChange }) {

  const URL = "http://localhost:8080/";
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');


  const inputsArray = [];

  const obtenerInformacionInputs = () => {
    const inputs = document.querySelectorAll('.sign-in-form Input');
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
    updateData(event);
  };

  const updateData = (e) => {
    const name = e.target.name;

    switch (name) {
      case 'nombre':
        setNombre(e.target.value);
      case 'apellidos':
        setApellidos(e.target.value);
      case 'email':
        setEmail(e.target.value);
      case 'password':
        setPassword(e.target.value);
    }
  }

  const updateForm = (input, changed) => {
    inputsArray.forEach(i => {
      if (i.id === input.id) i.empty = changed;
    })
  }


  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value);
  };

  // Handle registro

  const handleRegistro = async (e) => {
    const role = tipoUsuario == "profesor" ? "TEACHER" : "STUDENT";

    // const datos = { nombre, apellidos, email, password, role };

    e.preventDefault();

    const res = fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },  
      body: JSON.stringify({
        name: nombre,
        lastName: apellidos,
        email: email,
        password: password,
        role: role
      })
    })
  }

  //


  return (
    <Card className="bg-background/90 px-10 pb-10 pt-10 mt-10 mb-10 ml-5">
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
          id="register-nombre"
          className="sign-in-form"
          color="#E5D9B6"
          type="nombre"
          label="Nombre"
          name="nombre"
          placeholder="Introduce tu nombre"
          onChange={handleInputChange}
          isRequired
        />
        <Input
          id="register-apellidos"
          className="sign-in-form"
          color="#E5D9B6"
          type="apellido"
          label="Apellidos"
          name="apellidos"
          placeholder="Introduce tus apellidos"
          onChange={handleInputChange}
          isRequired
        />
        <Input
          id="register-email"
          className="sign-in-form"
          color="#E5D9B6"
          type="email"
          label="Email"
          name="email"
          placeholder="Introduce tu email"
          onChange={handleInputChange}
          isRequired
        />
        <Input
          id="register-password"
          className="sign-in-form"
          color="#285430"
          type="password"
          label="Contraseña"
          name="password"
          placeholder="Introduce tu contraseña"
          onChange={handleInputChange}
          isRequired
        />

        <div className="flex flex-col gap-3">
          <RadioGroup
            label="Tipo de usuario"
            value={tipoUsuario}
            onChange={handleTipoUsuarioChange}
          >
            <Radio value="profesor">Profesor</Radio>
            <Radio value="alumno">Alumno</Radio>
          </RadioGroup>
        </div>
        <ButtonGroup className="flex pt-2">
          <Button
            color="#285430"
            className=" flex-1 hover:bg-green-600"
            onClick={handleRegistro}
          >
            Registrarse
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

export default Register;
