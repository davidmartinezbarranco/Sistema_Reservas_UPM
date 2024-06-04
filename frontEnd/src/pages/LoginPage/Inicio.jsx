import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { NextUIProvider } from "@nextui-org/react";
import NotRegistered from "./components/NotRegistered";
import NotLoggedIn from "./components/NotLoggedIn";
import styles from "./Inicio.module.css";




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
                showLoginForm();
        }

        const cambiarARegistro = () => {
                showRegisterForm();
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



        return (
                <NextUIProvider >
                        <div className={styles["inicio-custom"]}>
                                <div className="min-h-screen inicio-custom-size">
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
                        </div>


                </NextUIProvider >


        );
}
export default Inicio;