import React, { useState } from "react";
import Login from "./Login";
import RegisterBack from "./NotRegistered";
import LoginBack from "./NotLoggedIn";
import Register from "./Register";
import "../styles.css";
import { NextUIProvider } from "@nextui-org/react";
import NotRegistered from "./NotRegistered";
import NotLoggedIn from "./NotLoggedIn";




function Inicio() {
        const [visible, setVisible] = useState(true);

        const toggleVisibilidad = () => {
                setVisible(!visible);
        }
        
        const mostrarRegistro = visible ? 'visible' : 'oculto';
        const mostarInicioSesion = visible ? 'oculto' : 'visible';
        

        return (
                <NextUIProvider>
                        <main className=" bg-azul text-foreground min-h-screen grid place-content-center">      
                                <html>
                                        <head>
                                                <link rel="stylesheet" href="styles2.css" />
                                        </head>
                                        <body>
                                                <div className="Inicio">
                                                        <div className={mostrarRegistro}>
                                                                <div className="Not-registered-box">
                                                                        <NotRegistered onToggle ={toggleVisibilidad}></NotRegistered>
                                                                </div>
                                                                <div className="Login-box">
                                                                        <Login></Login>
                                                                </div>
                                                        </div>

                                                        <div className={mostarInicioSesion}>
                                                                <div className="Not-registered-box">
                                                                        <NotLoggedIn onToggle ={toggleVisibilidad}></NotLoggedIn>
                                                                </div>
                                                                <div className="Login-box">
                                                                        <Register></Register>
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