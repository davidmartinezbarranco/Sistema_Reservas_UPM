import React, { useEffect, useState } from "react";
import { Input, Button, ButtonGroup, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import BarraNavegacionProfessor from "../professorPages/Inicio/componentes/BarraNavegacion";
import BarraNavegacionStudent from "../studentPages/Inicio/componentes/BarraNavegacion";
import { getRole, getToken, setToken } from "../../helpers";
import styles from "./Profile.module.css";
import CustomModal from "../LoginPage/components/CustomModal";
import CustomModalDeleteUser from "./elements/CustomModal"



function Profile() {
    let token = "Bearer " + getToken();
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


        fetch("http://localhost:8080/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                let p = {
                    nombre: data.name,
                    apellidos: data.lastName,
                    email: data.email,
                }
                setPerfil(p);
            });


    }


    const saveChanges = () => {
        if (password != confirmedPassword) {
            setWarningMessage(["Las contraseñas no coinciden"]);
            setGuardadoPerfilFallido(true);

        } else {
            let dataToSend = {};

            if(name) dataToSend.name = name;
            if(lastName) dataToSend.lastName = lastName;
            if(email) dataToSend.email = email;
            if(password) dataToSend.password = password;

            enviarDatos(dataToSend);
        
        }
    }

    const enviarDatos = (data) => {
        fetch("http://localhost:8080/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();

                }
            })
            .then(data => {
                if(data != null){
                    setToken(data.jwt);
                }
                setMessage(["Las modificaciones se han realizado correctamente"]);
                setGuardadoPerfilCompletado(true);
            })


    }

    const handleChange = (completado) => {
        setGuardadoPerfilFallido(completado);
    };

    const [deleteAccount, setDeleteAccount] = useState(false);
    const [deleteAccountDecision, setDeleteAccountDecision] = useState(false);

    const cancelar = (decision) => {
        setDeleteAccountDecision(decision);
    }

    const handleChangeDeleteAccount = (completado) => {
        setDeleteAccount(completado);
    }


    useEffect(() => {
        if (deleteAccountDecision) {
            fetch("http://localhost:8080/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
                .then(response => {
                    if (response.ok) {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }
                })
        }
    }, [deleteAccountDecision]);

    const eliminarCuenta = () => {
        setWarningMessage(["¿Estás seguro de que quieres eliminar la cuenta?", "Perderás todos los datos asociados a ella."]);
        setDeleteAccount(true);
    }


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
                                            <br />
                                            <p>Si decides no hacer cambios en algún campo, los datos actuales permanecerán intactos.</p>

                                        </div>
                                        <div style={savingButtonsStyle}>
                                            <Button
                                                style={discardButtonStyle}
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

                        {editMode &&
                            <div className={styles.deleteAccountDiv}>
                                <div className={styles.centeredCardWrapper}>
                                    <Card className={styles.customCard}>
                                        <div className={styles.deleteButtonDiv}>
                                            <p>Opción sensible</p>
                                            <Button
                                                color="danger"
                                                onClick={eliminarCuenta}
                                            >
                                                Eliminar cuenta
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                        }
                    </div>

                </div>
                {<CustomModal titulo={title} text={message} cargar={guardadoPerfilCompletado} onChange={null} recargarPagina={recargarPagina} />}
                {<CustomModal titulo={title} text={warningMessage} cargar={guardadoPerfilFallido} onChange={handleChange} recargarPagina={false} />}
                {<CustomModalDeleteUser titulo={title} text={warningMessage} cargar={deleteAccount} onChange={handleChangeDeleteAccount} recargarPagina={false} setCancelar={cancelar} />}

            </main>
        </div>

    );
}

export default Profile;