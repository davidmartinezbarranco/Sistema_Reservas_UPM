import { React, useState, useRef } from "react";
import { Input, Button, ButtonGroup, RadioGroup, Radio, Card, CardHeader, CardBody } from "@nextui-org/react";
import "/src/styles.css"
import CustomModal from "./CustomModal";

function Register({ onChildChange }) {

  const URL = "http://localhost:8080/";
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [registroCompletado, setRegistroCompletado] = useState(false);
  const [registroFallido, setRegistroFallido] = useState(false);
  const [warningMessage, setWarningMessage] = useState([]);
  const [message, setMessage] = useState(["El registro se ha completado con éxito.", "Ya puede acceder a la plataforma."]);
  const [recargarPagina, setRecargarPagina] = useState("recargar");
  const [title, setTitle] = useState("INFORMACIÓN DEL REGISTRO");



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

  const isEmpty = (input) => {
    return (input === "");
  }

  const formIsEmpty = () => {
    return isEmpty(nombre) && isEmpty(apellidos) && isEmpty(email) && isEmpty(password) && isEmpty(tipoUsuario);
  }

  const formIsFull = () => {
    return !isEmpty(nombre) && !isEmpty(apellidos) && !isEmpty(email) && !isEmpty(password) && !isEmpty(tipoUsuario) && !isEmpty(confirmedPassword);
  }
  const handleInputChange = (event) => {
    updateForm(event.target, event.target.value.trim() === '');
    onChildChange(formIsEmpty());
    updateData(event);
  };

  const updateData = (e) => {
    let name = e.target.name;

    switch (name) {
      case 'nombre':
        setNombre(e.target.value);
        break;
      case 'apellidos':
        setApellidos(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmedPassword':
        setConfirmedPassword(e.target.value);
        break;
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  const handleRegistro = async (e) => {

    if (formIsFull() && password == confirmedPassword && validateEmail(email)) {
      const role = tipoUsuario == "profesor" ? "PROFESSOR" : "STUDENT";


      fetch("http://localhost:8080/auth/register", {
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
        .then(response => {
          if (response.ok) {
            setMessage(["El registro se ha completado con éxito.", "Ya puede acceder a la plataforma."])
            setRegistroCompletado(true);
          } else {
            setWarningMessage(["El usuario ya existe"]);
            setRegistroFallido(true);
          }
        });

    } else if (!formIsFull()) {
      setWarningMessage(["No has rellenado todo el formulario."]);
      setRegistroFallido(true);
    } else if (password != confirmedPassword) {
      setWarningMessage(["Las contraseñas no coinciden."]);
      setRegistroFallido(true);
    } else if (!validateEmail(email)){
      setWarningMessage(["No se ha introducido un email."]);
      setRegistroFallido(true);
    }

  }

  const handleChange = (completado) => {
    setRegistroFallido(completado);
  };


  return (
    <Card className="bg-background/100 px-8 pb-10 pt-10 mt-5 mb-5 ml-2.5">
      <CardHeader className="text-l font-bold justify-center items-center">
        <div className="flex flex-col items-center">
          <h1>Registro en Reserva de Aulas ETSISI</h1>
          <img
            className="w-24 h-24 object-center"
            src="/public/Logo.png"
            alt="Imagen logo web"
          />
        </div>
      </CardHeader>
      <CardBody id="card-body" className="space-y-2 iniciar-sesion-card-body">
        <Input
          id="register-nombre"
          className="sign-in-form text-sm"
          color="#E5D9B6"
          type="nombre"
          label="Nombre"
          name="nombre"
          placeholder="Introduce tu nombre"
          onChange={handleInputChange}

        />
        <Input
          id="register-apellidos"
          className="sign-in-form text-sm"
          color="#E5D9B6"
          type="apellido"
          label="Apellidos"
          name="apellidos"
          placeholder="Introduce tus apellidos"
          onChange={handleInputChange}

        />
        <Input
          id="register-email"
          className="sign-in-form text-sm"
          color="#E5D9B6"
          type="email"
          label="Email"
          name="email"
          placeholder="Introduce tu email"
          onChange={handleInputChange}

        />
        <Input
          id="register-password"
          className="sign-in-form text-sm"
          color="#285430"
          type="password"
          label="Contraseña"
          name="password"
          placeholder="Introduce tu contraseña"
          onChange={handleInputChange}

        />
        <Input
          id="register-confirmedPassword"
          className="sign-in-form"
          color="#285430"
          type="password"
          label="Confirme contraseña"
          name="confirmedPassword"
          placeholder="Introduce tu contraseña"
          onChange={handleInputChange}

        />

        <div className="flex flex-col gap-3">
          <RadioGroup
            label="Tipo de usuario"
            value={tipoUsuario}
            onChange={handleTipoUsuarioChange}
            size= "sm"
            orientation= "horizontal"
          >
            <Radio value="profesor">Profesor</Radio>
            <Radio value="alumno">Alumno</Radio>
          </RadioGroup>
        </div>
        <ButtonGroup className="flex pt-2">
          <Button
            className=" flex-1 hover:bg-green-600"
            onClick={handleRegistro}
          >
            Registrarse
          </Button>

        </ButtonGroup>
        {<CustomModal titulo={title} text={message} cargar={registroCompletado} onChange={null} recargarPagina={recargarPagina} />}
        {<CustomModal titulo={title} text={warningMessage} cargar={registroFallido} onChange={handleChange} recargarPagina={false} />}

      </CardBody>
    </Card>
  );
}

export default Register;


