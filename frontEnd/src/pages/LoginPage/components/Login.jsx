import React, { useState } from "react";
import { Input, Button, ButtonGroup, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import "/src/styles.css";
import { setToken, getRole } from "../../../helpers";

function Login({ onChildChange }) {

  const inputsArray = [];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);



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
    updateData(event);
  };

  const updateData = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  }

  const updateForm = (input, changed) => {
    inputsArray.forEach(i => {
      if (i.id === input.id) i.empty = changed;
    })
  }

  const iniciarSesion = () => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => {
        if (response.ok) {          
          return response.json();
        } else {
          setIncorrectCredentials(true);
          throw new Error('Error de autenticación');
        }
      })
      .then(data => {
        const id = data.id;
        localStorage.setItem("id", id);
        
        const jwt = data.jwt;
        setToken(jwt);
        const role = getRole(jwt);
        if( role == "PROFESSOR"){
          window.location.href = '/Indice';
        }else if (role == "STUDENT"){
          window.location.href = '/Index';
        }
      })
  }

  return (
    <Card className="bg-background/100 px-10 pb-20 pt-20 mt-10 mb-10">
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
          name="email"
          onChange={handleInputChange}
        />
        <Input
          id="login-password"
          className="login-form"
          color="#285430"
          type="password"
          label="Contraseña"
          placeholder="Introduce tu contraseña"
          name="password"
          onChange={handleInputChange}
        />
        {incorrectCredentials && <p style={{ color: 'red' }}>Las credenciales son incorrectas</p>}
        <ButtonGroup className="flex pt-2">
          <Link style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button
              color="#285430"
              className="flex-1 hover:bg-blue-600"
              onClick={iniciarSesion}
            >
              Iniciar sesión
            </Button>
          </Link>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

export default Login;
