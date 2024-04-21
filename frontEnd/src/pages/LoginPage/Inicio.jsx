import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { NextUIProvider } from "@nextui-org/react";
import NotRegistered from "./components/NotRegistered";
import NotLoggedIn from "./components/NotLoggedIn";
import styles from "./Inicio.module.css"




function Inicio() {
        const [registerFormIsEmpty, setRegisterFormIsEmpty] = useState(true);
        const [loginFormIsEmpty, setLoginFormIsEmpty] = useState(true);
        const [mostrarInicioSesion, setMostrarInicioSesion] = useState(true);
        const [mostrarRegistro, setMostrarRegistro] = useState(false);



        const handleRegisterChildChange = (changed) => {
                setRegisterFormIsEmpty(changed);
        }

        const handleLoginChildChange = (changed) => {
                setLoginFormIsEmpty(changed);
        }

        const cambiarALogin = () => {
                if (registerFormIsEmpty) {
                        showLoginForm();
                } else {
                        var confirmacion = confirm("¿Quiere ir a la ventana de inicio de sesión? Es posible que los cambios no se guarden.");
                        if (confirmacion) {
                                showLoginForm();
                                vaciarRegistro();
                        }
                }

        }

        const cambiarARegistro = () => {
                if (loginFormIsEmpty) {
                        showRegisterForm();
                } else {
                        var confirmacion = confirm("¿Quiere ir a la ventana de registro? Es posible que los cambios no se guarden.");
                        if (confirmacion) {
                                showRegisterForm();
                                vaciarLogin();
                        }
                }

        }

        const showRegisterForm = () => {
                setMostrarRegistro(true);
                setMostrarInicioSesion(false);
        }

        const showLoginForm = () => {
                setMostrarInicioSesion(true);
                setMostrarRegistro(false);
        }




        const showInicioSesion = mostrarInicioSesion ? 'visible' : 'oculto';
        const showRegistro = mostrarRegistro ? 'visible' : 'oculto';



        useEffect(() => {
                const handleBeforeUnload = (event) => {
                        if (!loginFormIsEmpty || !registerFormIsEmpty) {
                                event.preventDefault();
                                event.returnValue = '';
                        }
                };

                window.addEventListener('beforeunload', handleBeforeUnload);

                return () => {
                        window.removeEventListener('beforeunload', handleBeforeUnload);
                };
        }, [loginFormIsEmpty, registerFormIsEmpty]);


        function vaciarLogin(){
                console.log("vaciar");
        }


        return (
                <NextUIProvider >

                        <div className="bg-azul min-h-screen inicio-custom-size">
                                <div className={showInicioSesion}>
                                        <div className="">
                                                <NotRegistered onToggle={cambiarARegistro}></NotRegistered>
                                        </div>
                                        <div className="">
                                                <Login
                                                        onChildChange={handleLoginChildChange} >
                                                </Login>
                                        </div>
                                </div>

                                <div className={showRegistro}>
                                        <div className="">
                                                <Register onChildChange={handleRegisterChildChange}></Register>
                                        </div>
                                        <div className="">
                                                <NotLoggedIn onToggle={cambiarALogin} ></NotLoggedIn>
                                        </div>

                                </div>
                        </div>

                </NextUIProvider >


        );
}
export default Inicio;