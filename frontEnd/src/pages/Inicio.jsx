import React from "react";
import Login from "./Login";
import RegisterBack from "./NotRegistered";
import LoginBack from "./NotLoggedIn";
import Register from "./Register";
import "../styles2.css";
import { NextUIProvider } from "@nextui-org/react";
import NotRegistered from "./NotRegistered";
import NotLoggedIn from "./NotLoggedIn";




function Inicio() {
        return (
                <NextUIProvider>
                        <main className=" bg-azul text-foreground min-h-screen grid place-content-center">      
                                <html>
                                        <head>
                                                <link rel="stylesheet" href="styles2.css" />
                                        </head>
                                        <body>
                                                <div className="Inicio">
                                                        <div className="Ventana-iniciar-sesion">
                                                                <div className="Not-registered-box">
                                                                        <NotRegistered></NotRegistered>
                                                                </div>
                                                                <div className="Login-box">
                                                                        <Login></Login>
                                                                </div>
                                                        </div>

                                                        <div className="Ventana-iniciar-sesion">
                                                                <div className="Not-registered-box">
                                                                        <NotLoggedIn></NotLoggedIn>
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