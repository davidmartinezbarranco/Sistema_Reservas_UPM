import React from "react";
import Login from "./Login";
import RegisterBack from "./NotRegistered";
import LoginBack from "./LoginBack";
import Register from "./Register";
import "../styles2.css"




function Inicio() {
        return (
                <html>
                        <head>
                                <link rel="stylesheet" href="styles2.css" />
                        </head>
                        <body>
                                <div className="Inicio">
                                        <div className="Ventana-iniciar-sesion">
                                                <div className="Not-registered-box">
                                                        <RegisterBack></RegisterBack>
                                                </div>
                                                <div className="Login-box">
                                                        <Login></Login>
                                                </div>
                                        </div>
                                </div>
                        </body>
                </html>


        );
}
export default Inicio;