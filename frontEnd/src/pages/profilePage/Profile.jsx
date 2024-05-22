import React, { useEffect, useState } from "react";
import { Input, Button, ButtonGroup, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import BarraNavegacionProfessor from "../professorPages/Inicio/componentes/BarraNavegacion";
import BarraNavegacionStudent from "../studentPages/Inicio/componentes/BarraNavegacion";
import { getRole } from "../../helpers";
import styles from "./Profile.module.css";
import CustomModal from "../LoginPage/components/CustomModal";



function Profile() {
    const role = getRole(localStorage.getItem("token"));

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [perfil, setPerfil] = useState();

    const [warningMessage, setWarningMessage] = useState([]);
    const [message, setMessage] = useState([]);
    const [guardadoPerfilFallido, setGuardadoPerfilFallido] = useState(false);
    const [guardadoPerfilCompletado, setGuardadoPerfilCompletado] = useState(false);
    const [recargarPagina, setRecargarPagina] = useState("/Profile");
    const [title, setTitle] = useState("INFORMACIÓN DEL PERFIL");


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmedPasswordChange = (event) => {
        setConfirmedPassword(event.target.value);
    }



    const editButtonStyle = {
        "display": editMode == true ? "none" : "flex",
        "margin": "30px",
        "justifyContent": "center"
    }

    const savingButtonsStyle = {
        "display": editMode == true ? "flex" : "none",
        "justifyContent": 'center',
        "alignItems": 'center',
        "gap": '10px',
    };

    const saveButtonStyle = {
        "margin": '5px',
    };

    const discardButtonStyle = {
        "margin": '5px',
    };



    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        let p = {
            nombre: "Brian",
            apellidos: "Pardo",
            email: "b@gmail.com",
        }
        setPerfil(p);
    }


    const saveChanges = () => {
        if (password != confirmedPassword) {
            setWarningMessage(["Las contraseñas no coinciden"]);
            setGuardadoPerfilFallido(true);

        } else {
            if (password != "") {
                let dataToSend = {
                    name: name ? name : perfil.nombre,
                    lastName: lastName ? lastName : perfil.apellidos,
                    email: email ? email : perfil.email,
                    password: password
                }
                
                enviarDatos(dataToSend);
            } else {
                let dataToSend = {
                    name: name ? name : perfil.nombre,
                    lastName: lastName ? lastName : perfil.apellidos,
                    email: email ? email : perfil.email,
                }
                enviarDatos(dataToSend);
            }
        }
    }

    const enviarDatos = (data) => {
        console.log(data);
        // enviar datos
        setMessage(["Las modificaciones se han realizado correctamente"]);
        setGuardadoPerfilCompletado(true);
    }

    const handleChange = (completado) => {
        setGuardadoPerfilFallido(completado);
    };



    return (
        <div >
            <main className="bg-azul text-foreground min-h-screen">
                <div className={styles.perfil}>
                    {role == "PROFESSOR" && <BarraNavegacionProfessor></BarraNavegacionProfessor>}
                    {role == "STUDENT" && <BarraNavegacionStudent></BarraNavegacionStudent>}
                </div>
                <div>
                    <h1 className={styles["perfil-titles"]} > INFORMACIÓN PERSONAL </h1>
                    <div className={styles["perfil-content"]}>
                        <Card>
                            <CardHeader className={styles.header}>
                                <img className={styles["image"]} src="../../public/profile.png" />
                            </CardHeader>
                            <CardBody>
                                <div className={styles.input}>
                                    <Input
                                        id="name"
                                        color="#E5D9B6"
                                        type="text"
                                        label="Nombre"
                                        placeholder={perfil ? perfil.nombre : ""}
                                        onChange={handleNameChange}
                                        isReadOnly={!editMode}

                                    />
                                </div>
                                <div className={styles.input}>
                                    <Input
                                        id="apellidos"
                                        color="#E5D9B6"
                                        type="text"
                                        label="Apellidos"
                                        placeholder={perfil ? perfil.apellidos : ""}
                                        onChange={handleLastNameChange}
                                        isReadOnly={!editMode}
                                    />
                                </div>
                                <div className={styles.input}>
                                    <Input
                                        id="email"
                                        color="#E5D9B6"
                                        type="email"
                                        label="Email"
                                        placeholder={perfil ? perfil.email : ""}
                                        onChange={handleEmailChange}
                                        isReadOnly={!editMode}
                                    />
                                </div>
                                <div style={editButtonStyle}>
                                    <Button
                                        onClick={() => {
                                            setEditMode(true);
                                        }}
                                        color="secondary"
                                    >
                                        Editar información
                                    </Button>
                                </div>

                                {
                                    editMode &&
                                    <div>
                                        <div className={styles.input}>
                                            <Input
                                                id="password"
                                                color="#E5D9B6"
                                                type="password"
                                                label="Contraseña"
                                                onChange={handlePasswordChange}

                                            />
                                        </div>
                                        <div className={styles.input}>
                                            <Input
                                                id="confirmedPassword"
                                                color="#E5D9B6"
                                                type="password"
                                                label="Confirme contraseña"
                                                onChange={handleConfirmedPasswordChange}
                                            />
                                            <p>Si decides no hacer cambios en algún campo, los datos actuales permanecerán intactos</p>
                                        </div>
                                        <div style={savingButtonsStyle}>
                                            <Button
                                                style={discardButtonStyle}
                                                color="danger"
                                                onClick={() => {
                                                    setEditMode(false);
                                                    window.location.reload();
                                                }}

                                            >
                                                Descartar cambios
                                            </Button>
                                            <Button
                                                style={saveButtonStyle}
                                                color="primary"
                                                onClick={saveChanges}
                                            >
                                                Guardar cambios
                                            </Button >

                                        </div>
                                    </div>
                                }


                            </CardBody>
                        </Card>
                    </div>

                </div>
                {<CustomModal titulo={title} text={message} cargar={guardadoPerfilCompletado} onChange={null} recargarPagina={recargarPagina} />}
                {<CustomModal titulo={title} text={warningMessage} cargar={guardadoPerfilFallido} onChange={handleChange} recargarPagina={false} />}

            </main>
        </div>

    );
}

export default Profile;