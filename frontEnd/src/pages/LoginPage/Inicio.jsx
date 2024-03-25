import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { NextUIProvider } from "@nextui-org/react";
import NotRegistered from "./components/NotRegistered";
import NotLoggedIn from "./components/NotLoggedIn";




function Inicio() {
        const [registerFormIsEmpty, setRegisterFormIsEmpty] = useState(true);
        const [loginFormIsEmpty, setLoginFormIsEmpty] = useState(true);
        const [mostrarInicioSesion, setMostrarInicioSesion] = useState(true);
        const [mostrarRegistro, setMostrarRegistro] = useState(false);
        
        

        const handleRegisterChildChange = (changed) =>{
                setRegisterFormIsEmpty(changed);
        }

        const handleLoginChildChange = (changed) =>{
                setLoginFormIsEmpty(changed);
        }

        const cambiarALogin = () => {
                if (registerFormIsEmpty){
                        showLoginForm();
                }
                
        }

        const cambiarARegistro = () => {
                if(loginFormIsEmpty){
                        showRegisterForm();
                }
                
        }

        const showRegisterForm = () =>{
                setMostrarInicioSesion(false);
                setMostrarRegistro(true);
        }

        const showLoginForm = () =>{
                setMostrarInicioSesion(true);
                setMostrarRegistro(false);
        }

      
        const showInicioSesion = mostrarInicioSesion ? 'visible' : 'oculto';
        const showRegistro = mostrarRegistro ? 'visible' : 'oculto' ;

       


        return (
                <NextUIProvider>
                        <main className="bg-azul min-h-screen inicio-custom-size">
                                <html>
                                        <body>
                                                <div>
                                                        <div className={showInicioSesion}>
                                                                <div className="">
                                                                        <NotRegistered onToggle={cambiarARegistro}></NotRegistered>
                                                                </div>
                                                                <div className="">
                                                                        <Login onChildChange={handleLoginChildChange} ></Login>
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
                                        </body>
                                </html>
                        </main>
                </NextUIProvider >


        );
}
export default Inicio;