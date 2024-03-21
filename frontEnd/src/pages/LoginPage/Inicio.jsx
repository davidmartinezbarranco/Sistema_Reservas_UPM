import React, { useState } from "react";
import Login from "./components/Login";
import RegisterBack from "./components/NotRegistered";
import LoginBack from "./components/NotLoggedIn";
import Register from "./components/Register";
import { NextUIProvider } from "@nextui-org/react";
import NotRegistered from "./components/NotRegistered";
import NotLoggedIn from "./components/NotLoggedIn";




function Inicio() {
        const [visible, setVisible] = useState(true);

        const toggleVisibilidad = () => {
                setVisible(!visible);
        }

        const mostrarRegistro = visible ? 'visible' : 'oculto';
        const mostarInicioSesion = visible ? 'oculto' : 'visible';


        return (
                <NextUIProvider>
                        <main className="bg-azul min-h-screen inicio-custom-size">
                                <html>
                                        <body>
                                                <div>
                                                        <div className={mostrarRegistro}>
                                                                <div className="">
                                                                        <NotRegistered onToggle={toggleVisibilidad}></NotRegistered>
                                                                </div>
                                                                <div className="">
                                                                        <Login></Login>
                                                                </div>
                                                        </div>

                                                        <div className={mostarInicioSesion}>
                                                                <div className="">
                                                                        <Register></Register>
                                                                </div>
                                                                <div className="">
                                                                        <NotLoggedIn onToggle={toggleVisibilidad}></NotLoggedIn>
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